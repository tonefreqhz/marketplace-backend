/*
* @author 4Dcoder
*/

import express from "express";
import * as permission from "./../controllers/permissionController";

const permissionRoute = express.Router();

// Create a new permission
permissionRoute.post("/permissions", permission.create);

// Retrieve all Notes
permissionRoute.get("/permissions", permission.findAll);

// Retrieve a single permission with permissionId
permissionRoute.get("/permissions/:permissionId", permission.findOne);

// Update a permission with permissionId
permissionRoute.put("/permissions/:permissionId", permission.update);

// Delete a permission with permissionId
permissionRoute.delete("/permissions/:permissionId", permission.delete);

export default permissionRoute;
