/*
* @author 4Dcoder
*/

import express from "express";
import * as order from "./../controllers/orderController";

const orderRoute = express.Router();

// Create a new order
orderRoute.post("/orders", order.create);

// Retrieve all Notes
orderRoute.get("/orders", order.findAll);

// Retrieve a single order with orderId
orderRoute.get("/orders/:orderId", order.findOne);

// Update a order with orderId
orderRoute.put("/orders/:orderId", order.update);

// Delete a order with orderId
orderRoute.delete("/orders/:orderId", order.delete);

export default orderRoute;
