/*
* @author 4Dcoder
*/

import express from "express";
import * as mail from "./../controllers/mailController";

const mailRoute = express.Router();

// Create a new mail
mailRoute.post("/mails", mail.create);

// Retrieve all mail
mailRoute.get("/mails", mail.findAll);

// Retrieve a single mail with mailId
mailRoute.get("/mails/:mailId", mail.findOne);

// Update a mail with mailId
mailRoute.put("/mails/:mailId", mail.update);

// Delete a mail with mailId
mailRoute.delete("/mails/:mailId", mail.delete);

export default mailRoute;
