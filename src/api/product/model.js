/**
 * @description Currency is infered from the vendor currency preferences for all vendor products
 * @author 4Dcoder
 */

import mongoose, { Schema } from "mongoose";
import Category from "../category/model";
import Vendor from "../vendor/model";
import Brand from "../brand/model";

const ProductSchema = new Schema({
  code: { type: String, unique: true, required: [false, "Why no Code?"], max: 50 },
  sku: { type: String, required: [false, "Why no Sku?"], max: 50 },
  upc: { type: String, required: [false, "Why no Upc?"], max: 50 },
  name: { type: String, required: [true, "Why no Product name?"], max: 200 },
  tag: { type: Array, default: [] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  category: {
    main: { type: Schema.Types.ObjectId, ref: "Category" },
    sub: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  brand: { type: Schema.Types.ObjectId, ref: "Brand" },
  description: { type: String, required: [true, "Why no Description?"], max: 5000 },
  short_description: { type: String, required: [true, "Why no Short description?"], max: 500 },
  color: { type: String, default: "" },
  parent: { type: String, default: "" },
  cost: {
    unit_cost: { type: Number, required: [true, "Why no Unit cost?"] },
    unit_price: { type: Number, required: [true, "Why no Unit price?"] },
    alt_price: { type: Number },
    discount: { type: Number, required: [false, "Why no Discount?"], default: 0.0 },
    discount_type: { type: String, enum: ["fixed", "percent"], default: "percent" },
    tax: { type: Number, required: [false, "Why no Tax?"], default: 0.0 },
    tax_type: { type: String, enum: ["fixed", "percent"], default: "percent" },
  },
  images: {
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
  },
  unit: { type: String, default: "" },
  shipping_details: {
    shipping_cost: { type: Number, default: 0.0 },
    weight: { type: String, max: 20 },
    length: { type: String, max: 20 },
    width: { type: String, max: 20 },
    height: { type: String, max: 20 },
  },
  manufacture_details: {
    make: { type: String, max: 100 },
    model_number: { type: String, max: 100 },
    release_date: { type: Date },
  },
  download: { type: Boolean, required: [false, "Why no Download?"], default: false },
  download_name: { type: String, default: "Bezop-Product-Download" },
  deal: { type: Boolean, required: [false, "Why no Deal?"], default: false },
  valuation: { type: String, enum: ["FIFO", "LIFO", "AVCO"], default: "LIFO", required: [true, "Why no valuation?"] },
  extra_fields: [{
    name: { type: String, max: 20 },
    value: { type: String, max: 100 },
  }],
  download_num: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  analytics: {
    view_date: { type: Date, default: Date.now },
    view_count: { type: Number, default: 1 },
  },
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
