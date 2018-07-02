/*
* @author 4Dcoder
*/

import express from "express";
import * as role from "./../controllers/roleController";

const roleRoute = express.Router();

// Create a new role
roleRoute.post("/roles", role.create);

// Retrieve all Notes
roleRoute.get("/roles", role.findAll);

// Retrieve a single role with roleId
roleRoute.get("/roles/:roleId", role.findOne);

// Update a role with roleId
roleRoute.put("/roles/:roleId", role.update);

// Delete a role with roleId
roleRoute.delete("/roles/:roleId", role.delete);

export default roleRoute;
