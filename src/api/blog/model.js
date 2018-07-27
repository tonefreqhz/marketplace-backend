/*
* @author Factman60
*/

import mongoose, { Schema } from "mongoose";
import Vendor from "../vendor/model"; // Author.

const BlogSchema = new Schema({
  kind: { type: String, enum: ["news", "post"], default: "post" },
  title: { type: String, required: [true, "Why no Title?"] },
  summary: { type: String, required: [true, "Why no Summary?"] },
  vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  content: { type: String, required: [true, "Why no content?"] },
  tag: { type: Array, required: [true, "Why no Tag?"] },
  image: { type: [] },
  viewCount: { type: Number, default: 1 },
  standing: {
    type: String,
    enum: ["published", "unpublished", "trashed"],
    default: "unpublished",
  },
  updated: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

const Blog = mongoose.model("Blog", BlogSchema);
export const { ObjectId } = mongoose.Types.ObjectId;
export default Blog;
