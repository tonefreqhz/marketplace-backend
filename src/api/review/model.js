/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";
import Customer from "../customer/model";

const ReviewSchema = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  subject: {
    type: String,
    enum: ["product", "category", "brand", "vendor", "stock", "order"],
    required: [true, "Why no subject?"],
  },
  subjectId: { type: String, required: [true, "Why no subject of review?"] },
  comment: { type: String },
  rating: {
    type: String,
    enum: ["1", "2", "3", "4", "5"],
    required: [true, "Why no rating?"],
  },
  standing: {
    type: String,
    enum: ["show", "trashed"],
    default: "show",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Review = mongoose.model("Review", ReviewSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Review;
