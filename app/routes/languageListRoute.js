/*
* @author 4Dcoder
*/

import express from "express";
import * as languageList from "./../controllers/languageListController";

const languageListRoute = express.Router();

// Create a new languageList
languageListRoute.post("/languageLists", languageList.create);

// Retrieve all Notes
languageListRoute.get("/languageLists", languageList.findAll);

// Retrieve a single languageList with languageListId
languageListRoute.get("/languageLists/:languageListId", languageList.findOne);

// Update a languageList with languageListId
languageListRoute.put("/languageLists/:languageListId", languageList.update);

// Delete a languageList with languageListId
languageListRoute.delete("/languageLists/:languageListId", languageList.delete);

export default languageListRoute;
