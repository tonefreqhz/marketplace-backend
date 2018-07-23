/**
* @author 4Dcoder
* @description Multimedia files that cut across every vendor page
* It adds to the design on the page look and feel
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";

const MediaSchema = new Schema({
  media_type: { type: String, required: [true, "Why no media type?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  purpose: {
    type: String,
    enum: ["slide", "picture", "banner", "background"],
    required: [true, "Why no purpose?"],
  },
  page: {
    type: Array,
    default: { product: false, stock: false, vendor: false, brand: false, category: false, blog: false },
  },
  place: { type: String, required: [true, "Why no place?"] },
  num: { type: String, required: [true, "Why no num?"] },
  url: { type: String, required: [true, "Why no url?"] },
  title: { type: String, required: [true, "Why no title?"] },
  description: { type: String, required: [true, "Why no description?"] },
  style: { type: String, required: [true, "Why no style?"] },
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

const Media = mongoose.model("Media", MediaSchema);
export default Media;
