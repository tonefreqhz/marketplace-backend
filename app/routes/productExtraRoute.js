/*
* @author 4Dcoder
*/

import express from "express";
import * as productExtra from "./../controllers/productExtraController";

const productExtraRoute = express.Router();

// Create a new productExtra
productExtraRoute.post("/productExtras", productExtra.create);

// Retrieve all Notes
productExtraRoute.get("/productExtras", productExtra.findAll);

// Retrieve a single productExtra with productExtraId
productExtraRoute.get("/productExtras/:productExtraId", productExtra.findOne);

// Update a productExtra with productExtraId
productExtraRoute.put("/productExtras/:productExtraId", productExtra.update);

// Delete a productExtra with productExtraId
productExtraRoute.delete("/productExtras/:productExtraId", productExtra.delete);

export default productExtraRoute;
