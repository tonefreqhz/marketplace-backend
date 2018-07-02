/*
* @author 4Dcoder
*/

import express from "express";
import * as media from "./../controllers/mediaController";

const mediaRoute = express.Router();

// Create a new media
mediaRoute.post("/medias", media.create);

// Retrieve all Notes
mediaRoute.get("/medias", media.findAll);

// Retrieve a single media with mediaId
mediaRoute.get("/medias/:mediaId", media.findOne);

// Update a media with mediaId
mediaRoute.put("/medias/:mediaId", media.update);

// Delete a media with mediaId
mediaRoute.delete("/medias/:mediaId", media.delete);

export default mediaRoute;
