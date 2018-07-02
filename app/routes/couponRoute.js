/*
* @author 4Dcoder
*/

import express from "express";
import * as coupon from "./../controllers/couponController";

const couponRoute = express.Router();

// Create a new coupon
couponRoute.post("/coupons", coupon.create);

// Retrieve all Notes
couponRoute.get("/coupons", coupon.findAll);

// Retrieve a single coupon with couponId
couponRoute.get("/coupons/:couponId", coupon.findOne);

// Update a coupon with couponId
couponRoute.put("/coupons/:couponId", coupon.update);

// Delete a coupon with couponId
couponRoute.delete("/coupons/:couponId", coupon.delete);

export default couponRoute;
