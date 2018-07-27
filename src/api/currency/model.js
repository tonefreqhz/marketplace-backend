/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Admin from "../vendor/model";

const CurrencySchema = new mongoose.Schema({
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  name: { type: String, required: [true, "Why no name?"] },
  code: { type: String, required: [true, "Why no code?"] },
  description: { type: String, default: "" },
  kind: { type: String, enum: ["digital", "fiat"], required: [true, "Why no currency type?"] },
  symbol: { type: String, required: [true, "Why no symbol?"] },
  exchange: { type: Number, required: [true, "Why no dollar-based exchange rate?"] },
  icon: { type: String, default: "default-currency-icon.png" },
  viewCount: { type: Number, default: 1 },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "suspended",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Currency = mongoose.model("Currency", CurrencySchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Currency;
