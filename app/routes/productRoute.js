/*
* @author 4Dcoder
*/

import express from "express";
import * as product from "./../controllers/productController";

const productRoute = express.Router();

// Create a new product
productRoute.post("/products", product.create);

// Retrieve all Notes
productRoute.get("/products", product.findAll);

// Retrieve a single product with productId
productRoute.get("/products/:productId", product.findOne);

// Update a product with productId
productRoute.put("/products/:productId", product.update);

// Delete a product with productId
productRoute.delete("/products/:productId", product.delete);

export default productRoute;
