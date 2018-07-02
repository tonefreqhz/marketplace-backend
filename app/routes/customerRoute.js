/*
* @author 4Dcoder
*/

import express from "express";
import * as customer from "./../controllers/customerController";

const customerRoute = express.Router();

// Create a new customer
customerRoute.post("/customers", customer.create);

// Retrieve all Notes
customerRoute.get("/customers", customer.findAll);

// Retrieve a single customer with customerId
customerRoute.get("/customers/:customerId", customer.findOne);

// Update a customer with customerId
customerRoute.put("/customers/:customerId", customer.update);

// Delete a customer with customerId
customerRoute.delete("/customers/:customerId", customer.delete);

export default customerRoute;
