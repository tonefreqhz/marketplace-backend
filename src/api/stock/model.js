/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";

const StockSchema = new Schema({
  vendor: [{ type: Schema.Types.ObjectId, ref: "Vendor" }],
  vendor_id: { type: String, required: [true, "Why no vendor id?"] },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  order_num: { type: String, required: [true, "Why no order number?"] },
  kind: { type: String, enum: ["add", "destroy"], required: [true, "Why no kind?"] },
  quantity: { type: Number, required: [true, "Why no quantity?"] },
  available: { type: Number, default: 0 },
  unit_cost: { type: Number, required: [true, "Why no unit cost?"] },
  unit_price: { type: Number, required: [true, "Why no unit price?"] },
  description: { type: String, required: [true, "Why no description?"] },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },

}, {
  timestamps: true,
});

const Stock = mongoose.model("Stock", StockSchema);
export default Stock;
