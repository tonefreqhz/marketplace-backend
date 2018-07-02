/*
* @author 4Dcoder
*/

import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  username: { type: String },
  metamask: { type: String },
  language: { type: String },
  gender: { type: String },
  password: { type: String },
  photo: { type: String },
  profile: { type: String },
  downloads: { type: Number, default: 0 },
  agent_status: { type: String },
  first_name: { type: String },
  middle_name: { type: String },
  last_name: { type: String },
  organization: { type: String },
  address1: { type: String },
  address2: { type: String },
  city: { type: String },
  zip: { type: String },
  postal_code: { type: String },
  lang_lat: { type: String },
  state: { type: String },
  country: { type: String },
  phone: { type: String },
  email: { type: String, unique: true },
  last_access: { type: [] },
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

const Customer = mongoose.model("Customer", CustomerSchema);
export default Customer;
