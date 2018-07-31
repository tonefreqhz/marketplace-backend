/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";

const SliderSchema = new Schema({
  name: { type: String, required: [true, "Why no slider name?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  kind: { type: String, enum: ["image", "text"], required: [true, "Why no Slider type?"] },
  page: {
    product: { type: Boolean, default: false },
    brand: { type: Boolean, default: false },
    category: { type: Boolean, default: false },
    blog: { type: Boolean, default: false },
  },
  place: { type: String, enum: ["top", "bottom"], required: [true, "Why no Slider location?"] },
  elements: {
    element0: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 0 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element1: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 1 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element2: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 2 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element3: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 3 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element4: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 4 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element5: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 5 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element6: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 6 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element7: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 7 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element8: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 8 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
    element9: {
      active: { type: Boolean, default: false },
      image: { type: String },
      position: { type: Number, default: 9 },
      title: { type: String, required: [true, "Why no title?"] },
      subtitle: { type: String, required: [true, "Why no subtitle?"] },
    },
  },
  style: {
    title: { type: String },
    subtitle: { type: String },
    image: { type: String },
    background: { type: String, default: "transparent" },
    color: { type: String, default: "black" },
  },
  standing: {
    type: String,
    enum: ["show", "hide", "trashed"],
    default: "show",
  },
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
      subtitle: this.subtitle,
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
