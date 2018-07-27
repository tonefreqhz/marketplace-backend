/*
* @author 4Dcoder
*/

import express from "express";
import * as brand from "./controller";
import { isValidVendor } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /brands Create brand
 * @apiName CreateBrand
 * @apiGroup Brand
 * @apiParam {String} access_token master access token.
 * @apiParam title Brand’s title.
 * @apiParam description Brand’s description.
 * @apiSuccess {Object} Brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.post("/brands", isValidVendor, brand.create);

/**
 * @api {get} /brands Retrieve brands
 * @apiName RetrieveBrands
 * @apiGroup Brand
 * @apiSuccess {Object[]} rows List of Brands.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/brands", brand.findAll);


/**
 * @api {get} /brands/:id Retrieve brand
 * @apiName RetrieveBrand
 * @apiGroup Brand
 * @apiSuccess {Object} brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 */
router.get("/brands/:brandId", brand.findOne);

/**
 * @api {put} /brands/:id Update brand
 * @apiName UpdateBrand
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Brand’s title.
 * @apiParam description Brand’s description.
 * @apiSuccess {Object} brand Brand's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.put("/brands/:brandId", isValidVendor, brand.update);

/**
 * @api {delete} /brands/:id Delete brand
 * @apiName DeleteBrand
 * @apiGroup Brand
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Brand not found.
 * @apiError 401 master access only.
 */
router.delete("/brands/:brandId", isValidVendor, brand.delete);

export default router;
