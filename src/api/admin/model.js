/*
* @author 4Dcoder
* @co author Odewale Ifeoluwa
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
    required: [true, "Why no MetaMask address?"],
  },
  username: { type: String, default: "" },
  role: { type: String, default: "" },
  lastAccess: [{
    accessDate: { type: Date },
    ipAddress: { type: String, min: 15, max: 45 },
  }],
  fullname: { type: String, default: "" },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  email: {
    type: String,
    lowercase: true,
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
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

AdminSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      nonce: this.nonce,
      publicAddress: this.publicAddress,
      username: this.username,
      role: this.role,
      last_access: this.last_access,
      fullname: this.fullname,
      phone: this.phone,
      address: this.address,
      email: this.email,
      notifications: this.notifications,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      standing: this.standing,
      updated: this.updated,
    } : view;
  },
};
const Admin = mongoose.model("Admin", AdminSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Admin;
