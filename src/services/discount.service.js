/**
 * Discount Service
 * 1. Generate discount cod [shop | Admin]
 * 2. Get discount amount [User]
 * 3. Get all discount codes [User | Shop]
 * 4. Verify discount code [User]
 * 5. Delete discount code [Admin | Shop]
 * 6. Cancel discount code [User]
 */

const { BadRequestError, NotFoundError } = require("../core/error.response");
const discountModel = require("../models/discount.model");
const { findAllProducts } = require("../models/repositories/product.repo");
const { convertToObjectidMongodb } = require("../utils");
const {
  findAllDiscountCodeUnselect,
  checkDiscountExists,
} = require("../models/repositories/discount.repo");

class DiscountService {
  static async createDiscountCode(payload) {
    const {
      code,
      start_date,
      end_date,
      is_active,
      shop_id,
      min_order_value,
      product_ids,
      applies_to,
      name,
      description,
      type,
      value,
      max_value,
      max_uses,
      uses_count,
      max_use_per_user,
      user_used,
    } = payload;

    // if (new Date() < new Date(star_date) || new Date() > new Date(end_date)) {
    //   throw new BadRequestError("Discount code has expired!");
    // }

    if (new Date(start_date) >= new Date(end_date))
      throw new BadRequestError("Start date must be before end date");

    const foundDiscount = await discountModel
      .findOne({
        discount_code: code,
        discount_shop_id: convertToObjectidMongodb(shop_id),
      })
      .lean();

    if (foundDiscount && foundDiscount.discount_is_active) {
      throw new BadRequestError("Discount exist!");
    }

    const newDiscount = await discountModel.create({
      discount_name: name,
      discount_description: description,
      discount_type: type,
      discount_code: code,
      discount_value: value,
      discount_min_order_value: min_order_value || 0,
      discount_max_value: max_value,
      discount_start_date: new Date(start_date),
      discount_end_date: new Date(end_date),
      discount_max_uses: max_uses,
      discount_uses_count: uses_count,
      discount_users_used: user_used,
      discount_shop_id: shop_id,
      discount_max_uses_per_user: max_use_per_user,
      discount_is_active: is_active,
      discount_applies_to: applies_to,
      discount_product_ids: product_ids === "all" ? [] : product_ids,
    });

    return newDiscount;
  }

  static async updateDiscountCode() {}

  static async getAllDiscountCodeWithProduct({ code, shop_id, limit, page }) {
    const foundDiscount = await discountModel
      .findOne({
        discount_code: code,
        discount_shop_id: convertToObjectidMongodb(shop_id),
      })
      .lean();

    if (!foundDiscount || !foundDiscount.discount_is_active)
      throw new BadRequestError("Discount not exist!");

    const { discount_applies_to, discount_product_ids } = foundDiscount;

    let products;

    if (discount_applies_to === "all") {
      // get all product
      products = await findAllProducts({
        filter: {
          product_shop: convertToObjectidMongodb(shop_id),
          isPublished: true,
        },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }

    if (discount_applies_to === "specific") {
      // get the product ids
      products = await findAllProducts({
        filter: { _id: { $in: discount_product_ids }, isPublished: true },
        limit: +limit,
        page: +page,
        sort: "ctime",
        select: ["product_name"],
      });
    }

    return products;
  }

  static async getAllDiscountCodeByShop({ limit, page, shop_id }) {
    const discounts = await findAllDiscountCodeUnselect({
      limit: +limit,
      page: +page,
      filter: {
        discount_shop_id: convertToObjectidMongodb(shop_id),
        discount_is_active: true,
      },
      unSelect: ["__v", "discount_shop_id"],
      model: discountModel,
    });

    return discounts;
  }

  static async getDiscountAmount({ code_id, user_id, shop_id, products }) {
    const foundDiscount = await checkDiscountExists({
      model: discountModel,
      filter: {
        discount_code: code_id,
        discount_shop_id: convertToObjectidMongodb(shop_id),
      },
    });

    if (foundDiscount) throw new NotFoundError("Discount does not exist");

    const {
      discount_is_active,
      discount_max_uses,
      discount_min_order_value,
      discount_max_uses_per_user,
      discount_users_used,
    } = foundDiscount;

    if (!discount_is_active) throw new NotFoundError("Discount expired");
    if (!discount_max_uses) throw new NotFoundError("Discount are out");

    if (
      new Date() < new Date(discount_start_date) ||
      new Date() > new Date(discount_end_date)
    )
      throw new NotFoundError("Discount expired");

    let totalOrder = 0;
    if (discount_min_order_value > 0) {
      (totalOrder = products.reduce(
        (acc, product) => acc + product.quantity * product.price
      )),
        0;

      if (totalOrder < discount_min_order_value)
        throw new NotFoundError(
          `Discount require a minium order value of ${discount_min_order_value}`
        );
    }

    if (discount_max_uses_per_user > 0) {
      const useUserDiscount = discount_users_used.find(
        (user) => user.user_id === user_id
      );

      if (useUserDiscount) {
        //...
      }
    }

    const amount =
      discount_type === "fixed_amount"
        ? discount_value
        : totalOrder * (discount_value / 100);

    return { totalOrder, amount, totalPrice: totalOrder - amount };
  }

  static async deleteDiscount({ shop_id, code_id }) {
    const deleted = await discountModel.findOneAndDelete({
      discount_code: code_id,
      discount_shop_id: convertToObjectidMongodb(shop_id),
    });

    return deleted;
  }

  static async cancelDiscount({ code_id, shop_id, user_id }) {
    const foundDiscount = await checkDiscountExists({
      model: discountModel,
      filter: {
        discount_code: code_id,
        discount_shop_id: convertToObjectidMongodb(shop_id),
      },
    });

    if (foundDiscount) throw new NotFoundError("Discount does not exist");

    const result = await discountModel.findByIdAndUpdate(foundDiscount._id, {
      $pull: {
        discount_users_used: user_id,
      },
      $inc: {
        discount_max_uses: 1,
        discount_uses_count: -1,
      },
    });

    return result;
  }
}

module.exports = DiscountService;
