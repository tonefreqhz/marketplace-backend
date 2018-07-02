/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: [true, "Why no Code?"] },
  sku: { type: String },
  upc: { type: String },
  name: { type: String, required: [true, "Why no Name?"] },
  tag: { type: [], required: [true, "Why no Tag ?"] },
  vendor_id: { type: Number, required: [true, "Why no Vendor ?"] },
  category_id: { type: Number, required: [true, "Why no Category ?"] },
  brand_id: { type: Number, required: [true, "Why no Brand ?"] },
  description: { type: String, required: [true, "Why no Description?"] },
  short_description: { type: String, required: [true, "Why no Short description?"] },
  unit_cost: { type: Number, required: [true, "Why no Unit cost?"] },
  unit_price: { type: Number, required: [true, "Why no Unit price?"] },
  alt_price: { type: Number },
  shipping_cost: { type: Number, required: [true, "Why no Shipping cost?"] },
  image_sm: { type: String, required: [true, "Why no Small Image ?"] },
  image_md: { type: String, required: [true, "Why no Medium Image ?"] },
  image_lg: { type: String, required: [true, "Why no Large Image ?"] },
  image_front: { type: String, required: [true, "Why no Medium Front Image ?"] },
  image_back: { type: String, required: [true, "Why no Medium Back Image ?"] },
  logo: { type: String },
  unit: { type: String },
  length: { type: String },
  width: { type: String },
  height: { type: String },
  color: { type: String },
  options: { type: String },
  discount: { type: Number, required: [true, "Why no Discount?"] },
  discount_type: { type: String, enum: ["fixed", "percent"], required: [true, "Why no Discount type?"] },
  tax: { type: Number, required: [true, "Why no Tax?"] },
  tax_type: { type: String, enum: ["fixed", "percent"], required: [true, "Why no Tax type?"] },
  download: { type: Number, required: [true, "Why no Download?"] },
  download_name: { type: String, required: [true, "Why no Download name?"] },
  deal: { type: String, required: [true, "Why no Deal?"] },
  valuation: {
    type: String,
    enum: ["FIFO", "LIFO", "AVCO"],
    default: "LIFO",
    required: [true, "Why no valuation method?"],
  },
  download_num: { type: Number },
  update_time: { type: Date, default: Date.now },
  requirements: { type: String },
  currency: { type: String, required: [true, "Why no Currency?"] },
  featured: { type: Boolean },
  view_date: { type: Date, default: Date.now },
  view_count: { type: Number, default: 1 },
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

const Product = mongoose.model("Product", ProductSchema);
export default Product;
