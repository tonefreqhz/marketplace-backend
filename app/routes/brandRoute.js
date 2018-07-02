/*
* @author 4Dcoder
*/

import express from "express";
import * as brand from "./../controllers/brandController";

const brandRoute = express.Router();

// Create a new brand
brandRoute.post("/brands", brand.create);

// Retrieve all Notes
brandRoute.get("/brands", brand.findAll);

// Retrieve a single brand with brandId
brandRoute.get("/brands/:brandId", brand.findOne);

// Update a brand with brandId
brandRoute.put("/brands/:brandId", brand.update);

// Delete a brand with brandId
brandRoute.delete("/brands/:brandId", brand.delete);

export default brandRoute;
