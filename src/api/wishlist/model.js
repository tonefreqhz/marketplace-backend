/*
* @author 4Dcoder
*/

import mongoose from "mongoose";
import Product from "../vendor/model";

const { Schema } = mongoose.Schema;

const WishlistSchema = new Schema({
  name: { type: String, required: [true, "Why no Name?"] },
  customer_id: { type: String, required: [true, "Why no Customer?"] },
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
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

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
