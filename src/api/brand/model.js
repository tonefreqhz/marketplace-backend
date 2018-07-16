/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const BrandSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Why no name?"] },
  description: { type: String, required: [true, "Why no description?"] },
  logo: { type: String, required: [true, "Why no logo?"] },
  banner: { type: String, required: [true, "Why no banner?"] },
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

const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;
