/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no name?"] },
  description: { type: String, required: [true, "Why no description?"] },
  kind: { type: String, enum: ["digital", "physical"], required: [true, "Why no category type?"] },
  icon: { type: String, required: [true, "Why no icon?"] },
  banner: { type: String, required: [true, "Why no banner?"] },
  parent: { type: String, default: 0 },
  created_by: { type: Number, required: [true, "Why no Vendor?"] },
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

const Category = mongoose.model("Category", CategorySchema);
export default Category;
