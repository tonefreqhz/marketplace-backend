/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: [false, "Why no Code?"], default: "" },
  sku: { type: String, required: [false, "Why no Sku?"], default: "" },
  upc: { type: String, required: [false, "Why no Upc?"], default: "" },
  name: { type: String, required: [false, "Why no Name?"], default: "" },
  tag: { type: [], required: [false, "Why no Tag?"], default: "" },
  vendor_id: { type: Number, required: [false, "Why no Vendor?"], default: "" },
  category_id: { type: Number, required: [false, "Why no Category?"], default: "" },
  brand_id: { type: Number, required: [false, "Why no Brand?"], default: "" },
  description: { type: String, required: [false, "Why no Description?"], default: "" },
  short_description: { type: String, required: [false, "Why no Short description?"], default: "" },
  unit_cost: { type: Number, required: [false, "Why no Unit cost?"], default: "" },
  unit_price: { type: Number, required: [false, "Why no Unit price?"], default: "" },
  alt_price: { type: Number, default: "" },
  shipping_cost: { type: Number, required: [false, "Why no Shipping cost?"], default: "" },
  image_sm: { type: String, required: [false, "Why no Small Image ?"], default: "" },
  image_md: { type: String, required: [false, "Why no Medium Image ?"], default: "" },
  image_lg: { type: String, required: [false, "Why no Large Image ?"], default: "" },
  image_front: { type: String, required: [false, "Why no Medium Front Image ?"], default: "" },
  image_back: { type: String, required: [false, "Why no Medium Back Image ?"], default: "" },
  icon: { type: String, default: "" },
  unit: { type: String, default: "" },
  length: { type: String, default: "" },
  width: { type: String, default: "" },
  height: { type: String, default: "" },
  color: { type: String, default: "" },
  options: { type: String, default: "" },
  discount: { type: Number, required: [false, "Why no Discount?"], default: "" },
  discount_type: { type: String, enum: ["fixed", "percent"], required: [false, "Why no Discount type?"], default: "" },
  tax: { type: Number, required: [false, "Why no Tax?"], default: "" },
  tax_type: { type: String, enum: ["fixed", "percent"], required: [false, "Why no Tax type?"], default: "" },
  download: { type: Number, required: [false, "Why no Download?"], default: "" },
  download_name: { type: String, required: [false, "Why no Download name?"], default: "" },
  deal: { type: String, required: [false, "Why no Deal?"], default: "" },
  valuation: {
    type: String,
    enum: ["FIFO", "LIFO", "AVCO"],
    default: "LIFO",
    required: [false, "Why no valuation method?"],
  },
  download_num: { type: Number, default: 0 },
  requirements: { type: String, default: "" },
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
