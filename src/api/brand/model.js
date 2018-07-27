/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";

const BrandSchema = new Schema({
  name: { type: String, required: [true, "Why no name?"] },
  description: { type: String, required: [true, "Why no description?"] },
  icon: { type: String, required: [false, "Why no logo?"] },
  banner: { type: String, required: [false, "Why no banner?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  viewCount: { type: Number, default: 1 },
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
export const { ObjectId } = mongoose.Types.ObjectId;
export default Brand;
