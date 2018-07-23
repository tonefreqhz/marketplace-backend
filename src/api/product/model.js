/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Category from "../category/model";
import Vendor from "../vendor/model";
import Brand from "../brand/model";
import ProductExtra from "../productExtra/model";

const ProductSchema = new Schema({
  code: { type: String, unique: true, required: [false, "Why no Code?"], default: "" },
  sku: { type: String, required: [false, "Why no Sku?"], default: "" },
  upc: { type: String, required: [false, "Why no Upc?"], default: "" },
  name: { type: String, required: [true, "Why no Name?"] },
  tag: { type: Array, default: [] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  vendor_id: { type: String, required: [true, "Why no vendor id?"] },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  productExtra: { type: Schema.Types.ObjectId, ref: "ProductExtra" },
  description: { type: String, required: [true, "Why no Description?"] },
  short_description: { type: String, required: [true, "Why no Short description?"] },
  unit_cost: { type: Number, required: [true, "Why no Unit cost?"] },
  unit_price: { type: Number, required: [true, "Why no Unit price?"] },
  alt_price: { type: Number },
  shipping_cost: { type: Number, default: 0.0 },
  image_sm: { type: String, default: "default-product-sm-image.jpg" },
  image_md: { type: String, default: "default-product-md-image.jpg" },
  image_lg: { type: String, default: "default-product-lg-image.jpg" },
  image_front: { type: String, default: "default-product-front-image.jpg" },
  image_back: { type: String, default: "default-product-back-image.jpg" },
  image_top: { type: String, default: "default-product-top-image.jpg" },
  image_bottom: { type: String, default: "default-product-bottom-image.jpg" },
  image_right: { type: String, default: "default-product-right-image.jpg" },
  image_left: { type: String, default: "default-product-left-image.jpg" },
  icon: { type: String, default: "default-product-icon.jpg" },
  unit: { type: String, default: "" },
  length: { type: String, default: "" },
  width: { type: String, default: "" },
  height: { type: String, default: "" },
  color: { type: String, default: "" },
  options: { type: String, default: "" },
  discount: { type: Number, required: [false, "Why no Discount?"], default: 0.0 },
  discount_type: { type: String, enum: ["fixed", "percent"], default: "percent" },
  tax: { type: Number, required: [false, "Why no Tax?"], default: 0.0 },
  tax_type: { type: String, enum: ["fixed", "percent"], default: "percent" },
  download: { type: Boolean, required: [false, "Why no Download?"], default: false },
  download_name: { type: String, default: "Bezop-Product-Download" },
  deal: { type: Boolean, required: [false, "Why no Deal?"], default: false },
  valuation: {
    type: String,
    enum: ["FIFO", "LIFO", "AVCO"],
    default: "LIFO",
  },
  download_num: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  view_date: { type: Date, default: Date.now },
  view_count: { type: Number, default: 1 },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [false, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
