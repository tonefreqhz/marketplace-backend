/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";
import Admin from "../vendor/model";

const LanguageSchema = new Schema({
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  word: { type: String, required: [true, "Why no word key?"] },
  english: { type: String, required: [true, "Why no english?"] },
  french: { type: String, required: [true, "Why no french?"] },
  spanish: { type: String, required: [true, "Why no spanish?"] },
  bangla: { type: String, required: [true, "Why no bangla?"] },
  arabic: { type: String, required: [true, "Why no arabic?"] },
  chinese: { type: String, required: [true, "Why no chinese?"] },
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

const Language = mongoose.model("Language", LanguageSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Language;
