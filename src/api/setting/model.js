/*
* @author 4Dcoder
*/

import mongoose, { Schema } from "mongoose";

const SettingSchema = new Schema({
  code: { type: String, required: [true, "Why no settings code?"] },
  kind: { type: String, enum: ["system", "users", "operations"], required: [true, "Why no type?"] },
  name: { type: String, required: [true, "Why no settings name?"] },
  value: { type: String, required: [true, "Why no settings value?"] },
  description: { type: String, required: [true, "Why no description?"] },
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

const Setting = mongoose.model("Setting", SettingSchema);
export default Setting;
