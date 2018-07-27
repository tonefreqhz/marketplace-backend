/*
* @author 4Dcoder
* admin_id is the staff attending to the ticket
*/
import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model";
import Customer from "../customer/model";

const TicketSchema = new Schema({
  complainant: { type: String },
  subject: { type: String },
  complain: { type: String },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  customer: { type: Schema.Types.ObjectId, ref: "Customer" },
  adminId: { type: String },
  standing: {
    type: String,
    enum: ["pending", "resolved", "arbitration"],
    default: "pending",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Ticket = mongoose.model("Ticket", TicketSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Ticket;
