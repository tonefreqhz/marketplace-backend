/*
* @author 4Dcoder
*/

import express from "express";
import * as vendor from "./../controllers/vendorController";

const vendorRoute = express.Router();

// Create a new vendor
vendorRoute.post("/vendors", vendor.create);

// Retrieve all Notes
vendorRoute.get("/vendors", vendor.findAll);

// Retrieve a single vendor with vendorId
vendorRoute.get("/vendors/:vendorId", vendor.findOne);

// Update a vendor with vendorId
vendorRoute.put("/vendors/:vendorId", vendor.update);

// Delete a vendor with vendorId
vendorRoute.delete("/vendors/:vendorId", vendor.delete);

export default vendorRoute;
