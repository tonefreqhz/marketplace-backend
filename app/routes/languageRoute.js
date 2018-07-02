/*
* @author 4Dcoder
*/

import express from "express";
import * as language from "./../controllers/languageController";

const languageRoute = express.Router();

// Create a new language
languageRoute.post("/languages", language.create);

// Retrieve all Notes
languageRoute.get("/languages", language.findAll);

// Retrieve a single language with languageId
languageRoute.get("/languages/:languageId", language.findOne);

// Update a language with languageId
languageRoute.put("/languages/:languageId", language.update);

// Delete a language with languageId
languageRoute.delete("/languages/:languageId", language.delete);

export default languageRoute;
