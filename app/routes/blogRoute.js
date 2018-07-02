/*
* @author 4Dcoder
*/

import express from "express";
import * as blog from "./../controllers/blogController";

const blogRoute = express.Router();

// Create a new blog
blogRoute.post("/blogs", blog.create);

// Retrieve all Notes
blogRoute.get("/blogs", blog.findAll);

// Retrieve a single blog with blogId
blogRoute.get("/blogs/:blogId", blog.findOne);

// Update a blog with blogId
blogRoute.put("/blogs/:blogId", blog.update);

// Delete a blog with blogId
blogRoute.delete("/blogs/:blogId", blog.delete);

export default blogRoute;
