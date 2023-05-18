const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema = new Schema(
  {
    inventory_product_id: { type: Schema.Types.ObjectId, ref: "Product" },
    inventory_location: { type: String, default: "unKnow" },
    inventory_stock: { type: Number, required: true },
    inventory_shop_id: { type: Schema.Types.ObjectId, ref: "Shop" },
    inventory_reservation: { type: Array, default: [] },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
);

module.exports = { inventoryModel: model(DOCUMENT_NAME, inventorySchema) };
