/*
* @author 4Dcoder
*/

import express from "express";
import * as review from "./../controllers/reviewController";

const reviewRoute = express.Router();

// Create a new review
reviewRoute.post("/reviews", review.create);

// Retrieve all Notes
reviewRoute.get("/reviews", review.findAll);

// Retrieve a single review with reviewId
reviewRoute.get("/reviews/:reviewId", review.findOne);

// Update a review with reviewId
reviewRoute.put("/reviews/:reviewId", review.update);

// Delete a review with reviewId
reviewRoute.delete("/reviews/:reviewId", review.delete);

export default reviewRoute;
