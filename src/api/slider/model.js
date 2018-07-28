/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";

const SliderSchema = new Schema({
  name: { type: String, required: [true, "Why no slider name?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  kind: {
    type: String,
    enum: ["image", "text"],
    default: "active",
    required: [true, "Why no Slider type?"],
  },
  elements: {
    type: [],
  },
  page: {
    product: { type: Boolean, default: false },
    stock: { type: Boolean, default: false },
    vendor: { type: Boolean, default: false },
    brand: { type: Boolean, default: false },
    category: { type: Boolean, default: false },
    blog: { type: Boolean, default: false },
  },
  place: { type: String },
  title: { type: String, required: [true, "Why no title?"] },
  style: { type: String },
  standing: { type: String },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

SliderSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      name: this.name,
      vendor: this.vendor,
      kind: this.kind,
      elements: this.elements,
      page: this.page,
      place: this.place,
      title: this.title,
      style: this.style,
      updatedAt: this.updatedAt,
      createdAt: this.createdAt,
    };

    return full ? {
      ...view,
      updated: this.updated,
      standing: this.standing,
    } : view;
  },
};

const Slider = mongoose.model("Slider", SliderSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Slider;
