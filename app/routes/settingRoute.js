/*
* @author 4Dcoder
*/

import express from "express";
import * as setting from "./../controllers/settingController";

const settingRoute = express.Router();

// Create a new setting
settingRoute.post("/settings", setting.create);

// Retrieve all Notes
settingRoute.get("/settings", setting.findAll);

// Retrieve a single setting with settingId
settingRoute.get("/settings/:settingId", setting.findOne);

// Update a setting with settingId
settingRoute.put("/settings/:settingId", setting.update);

// Delete a setting with settingId
settingRoute.delete("/settings/:settingId", setting.delete);

export default settingRoute;
