/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import Product from "../product/model";
import Vendor from "./../vendor/";

const { Schema } = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: [true, "Why no name?"] },
  description: { type: String, required: [true, "Why no description?"] },
  kind: { type: String, enum: ["digital", "physical"], required: [true, "Why no category type?"] },
  icon: { type: String, required: [false, "Why no icon?"] },
  banner: { type: String, required: [false, "Why no banner?"] },
  parent: { type: String, default: 0 },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  view_count: { type: Number, default: 1 },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Category = mongoose.model("Category", CategorySchema);
export default Category;
