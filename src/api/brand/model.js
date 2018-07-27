/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "../vendor/model";

const BrandSchema = new Schema({
  name: { type: String, required: [true, "Why no name?"] },
  description: { type: String, required: [true, "Why no description?"] },
  icon: { type: String, required: [false, "Why no logo?"] },
  banner: { type: String, required: [false, "Why no banner?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
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
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

BrandSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      banner: this.banner,
      vendor: this.vendor,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      view_count: this.view_count,
      standing: this.standing,
      updated: this.updated,
    } : view;
  },
};

const Brand = mongoose.model("Brand", BrandSchema);
export default Brand;
