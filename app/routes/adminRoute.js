/*
* @author 4Dcoder
*/

import express from "express";
import * as admin from "./../controllers/adminController";

const adminRoute = express.Router();

// Create a new admin
adminRoute.post("/admins", admin.create);

// Retrieve all Notes
adminRoute.get("/admins", admin.findAll);

// Retrieve a single admin with adminId
adminRoute.get("/admins/:adminId", admin.findOne);

// Update a admin with adminId
adminRoute.put("/admins/:adminId", admin.update);

// Delete a admin with adminId
adminRoute.delete("/admins/:adminId", admin.delete);

export default adminRoute;
