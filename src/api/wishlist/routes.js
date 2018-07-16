/*
* @author 4Dcoder
*/

import express from "express";
import * as wishlist from "./controller";

const router = express.Router();

// Create a new wishlist
router.post("/wishlists", wishlist.create);

// Retrieve all Notes
router.get("/wishlists", wishlist.findAll);

// Retrieve a single wishlist with wishlistId
router.get("/wishlists/:wishlistId", wishlist.findOne);

// Update a wishlist with wishlistId
router.put("/wishlists/:wishlistId", wishlist.update);

// Delete a wishlist with wishlistId
router.delete("/wishlists/:wishlistId", wishlist.delete);

export default router;
