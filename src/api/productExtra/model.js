/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";

const { Schema } = mongoose.Schema;

const ProductExtraSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  name: { type: String, required: [true, "Why no Extra field name?"] },
  value: { type: String, required: [true, "Why no value?"] },
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

const ProductExtra = mongoose.model("ProductExtra", ProductExtraSchema);
export default ProductExtra;
