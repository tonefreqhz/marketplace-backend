/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import Vendor from "../vendor/model";

const { Schema } = mongoose.Schema;

const CouponSchema = new Schema({
  title: { type: String, required: [true, "Why no title of coupon?"] },
  code: { type: String, required: [true, "Why no code of coupon?"] },
  spec_array: { type: [], default: [] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  till: { type: Date, required: [true, "Why no expiry date of coupon?"] },
  standing: {
    type: String,
    enum: ["active", "expired", "trashed"],
    default: "active",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Coupon = mongoose.model("Coupon", CouponSchema);
export default Coupon;
