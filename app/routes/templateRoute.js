/*
* @author 4Dcoder
*/

import express from "express";
import * as template from "./../controllers/templateController";

const templateRoute = express.Router();

// Create a new template
templateRoute.post("/templates", template.create);

// Retrieve all Notes
templateRoute.get("/templates", template.findAll);

// Retrieve a single template with templateId
templateRoute.get("/templates/:templateId", template.findOne);

// Update a template with templateId
templateRoute.put("/templates/:templateId", template.update);

// Delete a template with templateId
templateRoute.delete("/templates/:templateId", template.delete);

export default templateRoute;
