/*
* @author 4Dcoder
*/

import express from "express";
import * as category from "./../controllers/categoryController";

const categoryRoute = express.Router();

// Create a new category
categoryRoute.post("/categories", category.create);

// Retrieve all Notes
categoryRoute.get("/categories", category.findAll);

// Retrieve a single category with categoryId
categoryRoute.get("/categories/:categoryId", category.findOne);

// Update a category with categoryId
categoryRoute.put("/categories/:categoryId", category.update);

// Delete a category with categoryId
categoryRoute.delete("/categories/:categoryId", category.delete);

export default categoryRoute;
