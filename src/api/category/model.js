/*
* @author 4Dcoder
*/
import mongoose, { Schema } from "mongoose";
import Product from "../product/model";
import Vendor from "./../vendor/";

const categorySchema = new Schema({
  name: { type: String, required: [true, "Why no name?"] },
  description: { type: String, required: [true, "Why no description?"] },
  kind: { type: String, enum: ["digital", "physical"], required: [true, "Why no category type?"] },
  icon: { type: String, required: [false, "Why no icon?"] },
  banner: { type: String, required: [false, "Why no banner?"] },
  parent: { type: String, default: "0" },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  vendor_id: { type: String, required: [true, "Why no vendor id?"] },
  view_count: { type: Number, default: 1 },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});


categorySchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      description: this.description,
      kind: this.kind,
      icon: this.icon,
      banner: this.banner,
      parent: this.parent,
      products: this.products,
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

const model = mongoose.model("Category", categorySchema);

export const { schema } = model.schema;
export default model;
