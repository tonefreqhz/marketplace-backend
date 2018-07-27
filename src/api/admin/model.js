/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import { randomNonce } from "./../../services/helpers";

const AdminSchema = new mongoose.Schema({
  nonce: {
    type: Number,
    default: randomNonce(),
    required: [true, "Why no authentication nonce?"],
  },
  publicAddress: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Why no MetaMask address?"],
  },
  username: { type: String, default: "" },
  role: { type: String, default: "" },
  last_access: [{
    accessDate: { type: Date },
    ipAddress: { type: String, min: 15, max: 45 },
  }],
  fullname: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  email: {
    type: String,
    lowercase: true,
    unique: true,
  },
  notifications: [{
    date: { type: Date, default: Date.now },
    notice: { type: String, max: 2000 },
    standing: { type: String, enum: ["unread", "read", "trashed"], default: "unread" },
  }],
  standing: {
    type: String,
    enum: ["active", "suspended", "trashed"],
    default: "active",
  },
  updated: { type: Date, default: Date.now },
}, { timestamps: true });

const Admin = mongoose.model("Admin", AdminSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Admin;
