/*
* @author 4Dcoder
* admin_id is the staff attending to the ticket
*/
import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";
import Customer from "../customer/model";
import Admin from "../admin/model";

const TicketSchema = new Schema({
  person: { type: String, enum: ["customer", "vendor"], required: [true, "Why no complainant?"] },
  personId: { type: Schema.Types.ObjectId, ref: "Vendor" },
  subject: { type: String },
  complain: { type: String },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  admin: { type: Schema.Types.ObjectId, ref: "Admin" },
  standing: {
    type: String,
    enum: ["pending", "resolved", "arbitration"],
    default: "pending",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id; },
  },
});

TicketSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      person: this.person,
      personId: this.personId,
      subject: this.subject,
      complain: this.complain,
      vendor: this.vendor,
      customer: this.customer,
      admin: this.admin,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };

    return full ? {
      ...view,
      updated: this.updated,
      standing: this.standing,
    } : view;
  },
};


const Ticket = mongoose.model("Ticket", TicketSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Ticket;
