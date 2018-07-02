/*
* @author 4Dcoder
*/

import express from "express";
import * as message from "./../controllers/messageController";

const messageRoute = express.Router();

// Create a new message
messageRoute.post("/messages", message.create);

// Retrieve all Notes
messageRoute.get("/messages", message.findAll);

// Retrieve a single message with messageId
messageRoute.get("/messages/:messageId", message.findOne);

// Update a message with messageId
messageRoute.put("/messages/:messageId", message.update);

// Delete a message with messageId
messageRoute.delete("/messages/:messageId", message.delete);

export default messageRoute;
