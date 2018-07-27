/*
* @author 4Dcoder
*/

import express from "express";
import * as coupon from "./controller";
import { isValidVendor } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /coupons Create coupon
 * @apiName CreateCoupon
 * @apiGroup Coupon
 * @apiParam {String} access_token master access token.
 * @apiParam title Coupon’s title.
 * @apiParam code Coupon’s code.
 * @apiParam spec_array Coupon’s specification array.
 * @apiParam vendor_id Coupon’s vendor id.
 * @apiParam till Coupon’s expiry date.
 * @apiSuccess {Object} Coupon Coupon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coupon not found.
 * @apiError 401 master access only.
 */
router.post("/coupons", isValidVendor, coupon.create);

/**
* @api {get} /coupons Retrieve coupons
* @apiName RetrieveCoupons
* @apiGroup Coupon
* @apiSuccess {Object[]} rows List of Coupons.
* @apiError {Object} 400 Some parameters may contain invalid values.
*/
router.get("/coupons", isValidVendor, coupon.findAll);


/**
 * @api {get} /coupons/:id Retrieve coupon
 * @apiName RetrieveCoupon
 * @apiGroup Coupon
 * @apiSuccess {Object} coupon Coupon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coupon not found.
 */
router.get("/coupons/:couponId", isValidVendor, coupon.findOne);

/**
 * @api {put} /coupons/:id Update coupon
 * @apiName UpdateCoupon
 * @apiGroup Coupon
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Coupon’s title.
 * @apiParam code Coupon’s code.
 * @apiParam spec_array Coupon’s specification array.
 * @apiParam vendor_id Coupon’s vendor id.
 * @apiParam till Coupon’s expiry date.
 * @apiSuccess {Object} coupon Coupon's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Coupon not found.
 * @apiError 401 master access only.
 */
router.put("/coupons/:couponId", isValidVendor, coupon.update);

/**
 * @api {delete} /coupons/:id Delete coupon
 * @apiName DeleteCoupon
 * @apiGroup Coupon
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Coupon not found.
 * @apiError 401 master access only.
 */
router.delete("/coupons/:couponId", isValidVendor, coupon.delete);

export default router;
