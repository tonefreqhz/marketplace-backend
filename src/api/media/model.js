/**
* @author 4Dcoder
* @description Multimedia files that cut across every vendor page
* It adds to the design on the page look and feel
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";

const MediaSchema = new Schema({
  mediaType: { type: String, required: [true, "Why no media type?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  purpose: {
    type: String,
    enum: ["slide", "picture", "banner", "background"],
    required: [true, "Why no purpose?"],
  },
  page: {
    product: { type: Boolean, default: true },
    stock: { type: Boolean, default: true },
    vendor: { type: Boolean, default: true },
    brand: { type: Boolean, default: true },
    category: { type: Boolean, default: true },
    blog: { type: Boolean, default: true },
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
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

MediaSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      media_type: this.media_type,
      vendor: this.vendor,
      purpose: this.purpose,
      page: this.page,
      place: this.place,
      num: this.num,
      url: this.url,
      title: this.title,
      description: this.description,
      style: this.style,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      updated: this.updated,
      standing: this.standing,
    } : view;
  },
};

const Media = mongoose.model("Media", MediaSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Media;
