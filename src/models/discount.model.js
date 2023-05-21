const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Discount";
const COLLECTION_NAME = "discounts";

const discountSchema = new Schema(
  {
    discount_name: { type: String, required: true }, // name or title of the discount
    discount_description: { type: String, required: true }, // description of the discount
    discount_type: { type: String, default: "fixed_amount" }, // type of discount - fixed amount or percentage
    discount_value: { type: Number, required: true }, // the value (amount or percentage) of the discount
    discount_code: { type: String, required: true }, // unique code for the discount
    discount_start_date: { type: Date, required: true }, // the start date of the discount
    discount_end_date: { type: Date, required: true }, // the end date of the discount
    discount_max_uses: { type: Number, required: true }, // maximum number of times the discount can be used
    discount_uses_count: { type: Number, required: true }, // the number of times the discount has been used
    discount_users_used: { type: Array, default: [] }, // an array of user IDs who have used this discount
    discount_max_uses_per_user: { type: Number, required: true }, // maximum number of times a single user can use the discount
    discount_min_order_value: { type: Number, required: true }, // minimum order value required to apply the discount
    discount_shop_id: { type: Schema.Types.ObjectId, ref: "Shop" }, // ID of the shop to which the discount belongs
    discount_is_active: { type: Boolean, default: true }, // whether the discount is active or not
    discount_applies_to: { type: String, required: true, enum: ["all", "specific"] }, // whether the discount applies to all products or specific products only
    discount_product_ids: { type: Array, default: [] }, // an array of product IDs to which the discount applies (if discount_applies_to is "specific")
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = model(DOCUMENT_NAME, discountSchema);
