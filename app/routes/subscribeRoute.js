/*
* @author 4Dcoder
*/

import express from "express";
import * as subscribe from "./../controllers/subscribeController";

const subscribeRoute = express.Router();

// Create a new subscribe
subscribeRoute.post("/subscribes", subscribe.create);

// Retrieve all Notes
subscribeRoute.get("/subscribes", subscribe.findAll);

// Retrieve a single subscribe with subscribeId
subscribeRoute.get("/subscribes/:subscribeId", subscribe.findOne);

// Update a subscribe with subscribeId
subscribeRoute.put("/subscribes/:subscribeId", subscribe.update);

// Delete a subscribe with subscribeId
subscribeRoute.delete("/subscribes/:subscribeId", subscribe.delete);

export default subscribeRoute;
