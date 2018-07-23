/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";

const ProductExtraSchema = new Schema({
  product_id: { type: String, required: [true, "Why no Product id?"] },
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
