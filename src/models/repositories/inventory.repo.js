// const inventory = require("../inventory.model");

const { inventoryModel } = require("../inventory.model");

const insertInventory = async ({ product_id, shop_id, stock, location = "unKnow" }) => {
  return await inventoryModel.create({
    inventory_product_id: product_id,
    inventory_shop_id: shop_id,
    inventory_stock: stock,
    inventory_location: location,
  });
};

module.exports = { insertInventory };
