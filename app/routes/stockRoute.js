/*
* @author 4Dcoder
*/

import express from "express";
import * as stock from "./../controllers/stockController";

const stockRoute = express.Router();

// Create a new stock
stockRoute.post("/stocks", stock.create);

// Retrieve all Notes
stockRoute.get("/stocks", stock.findAll);

// Retrieve a single stock with stockId
stockRoute.get("/stocks/:stockId", stock.findOne);

// Update a stock with stockId
stockRoute.put("/stocks/:stockId", stock.update);

// Delete a stock with stockId
stockRoute.delete("/stocks/:stockId", stock.delete);

export default stockRoute;
