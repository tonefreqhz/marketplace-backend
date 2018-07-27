/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Admin from "../vendor/model";

const LanguageListSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  name: { type: String, required: [true, "Why no name?"] },
  dbField: { type: String, required: [true, "Why no langauge table field name?"] },
  icon: { type: String, required: [false, "Why no image?"] },
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
    required: [true, "Why no status?"],
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const LanguageList = mongoose.model("LanguageList", LanguageListSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default LanguageList;
