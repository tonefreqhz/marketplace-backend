/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const SliderSchema = new Schema({
  name: { type: String, required: [true, "Why no slider name?"] },
  vendor_id: { type: String, required: [true, "Why no vendor?"] },
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
    type: Array,
    default: { product: false, stock: false, vendor: false, brand: false, category: false, blog: false },
  },
  place: "",
  title: { type: String, required: [true, "Why no title?"] },
  style: { type: String },
  standing: { type: String },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Slider = mongoose.model("Slider", SliderSchema);
export default Slider;
