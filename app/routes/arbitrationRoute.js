/*
* @author 4Dcoder
*/

import express from "express";
import * as arbitration from "./../controllers/arbitrationController";

const arbitrationRoute = express.Router();

// Create a new arbitration
arbitrationRoute.post("/arbitrations", arbitration.create);

// Retrieve all Notes
arbitrationRoute.get("/arbitrations", arbitration.findAll);

// Retrieve a single arbitration with arbitrationId
arbitrationRoute.get("/arbitrations/:arbitrationId", arbitration.findOne);

// Update a arbitration with arbitrationId
arbitrationRoute.put("/arbitrations/:arbitrationId", arbitration.update);

// Delete a arbitration with arbitrationId
arbitrationRoute.delete("/arbitrations/:arbitrationId", arbitration.delete);

export default arbitrationRoute;
