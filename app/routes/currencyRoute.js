/*
* @author 4Dcoder
*/

import express from "express";
import * as currency from "./../controllers/currencyController";

const currencyRoute = express.Router();

// Create a new currency
currencyRoute.post("/currencies", currency.create);

// Retrieve all Notes
currencyRoute.get("/currencies", currency.findAll);

// Retrieve a single currency with currencyId
currencyRoute.get("/currencies/:currencyId", currency.findOne);

// Update a currency with currencyId
currencyRoute.put("/currencies/:currencyId", currency.update);

// Delete a currency with currencyId
currencyRoute.delete("/currencies/:currencyId", currency.delete);

export default currencyRoute;
