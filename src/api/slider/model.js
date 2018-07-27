/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const SliderSchema = new Schema({
  name: { type: String, required: [true, "Why no slider name?"] },
  vendorId: { type: String, required: [true, "Why no vendor?"] },
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
});

const Slider = mongoose.model("Slider", SliderSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Slider;
