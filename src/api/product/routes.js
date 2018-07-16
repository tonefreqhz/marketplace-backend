/*
* @author 4Dcoder
* @data 16-July-2018
*/

import express from "express";
import * as product from "./controller";

const router = express.Router();

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiParam {String} access_token master access token.
 * @apiParam kind Product's kind.
 * @apiParam category Product's category.
 * @apiParam sku Product's sku.
 * @apiParam price Product's price.
 * @apiParam name Product's name.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.post("/products", product.create);

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiSuccess {Number} count Total amount of products.
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/products", product.findAll);

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/products/:productId", product.findOne);

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam kind Product's kind.
 * @apiParam category Product's category.
 * @apiParam sku Product's sku.
 * @apiParam price Product's price.
 * @apiParam name Product's name.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/products/:productId", product.update);

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.delete("/products/:productId", product.delete);

export default router;
