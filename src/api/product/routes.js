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
 * @apiParam code Product’s code.
 * @apiParam sku Product’s sku.
 * @apiParam upc Product’s upc.
 * @apiParam name Product’s name.
 * @apiParam tag Product’s tag.
 * @apiParam vendor_id Product’s vendor id.
 * @apiParam category_id Product’s category id.
 * @apiParam brand_id Product’s brand id.
 * @apiParam description Product’s description.
 * @apiParam short_description Product’s short description.
 * @apiParam unit_cost Product’s unit cost.
 * @apiParam unit_price Product’s unit price.
 * @apiParam alt_price Product’s alt price.
 * @apiParam shipping_cost Product’s shipping cost.
 * @apiParam image_sm Product’s small image.
 * @apiParam image_md Product’s medium image.
 * @apiParam image_lg Product’s large image.
 * @apiParam image_front Product’s front image.
 * @apiParam image_back Product’s back image.
 * @apiParam icon Product’s icon.
 * @apiParam unit Product’s unit.
 * @apiParam length Product’s length.
 * @apiParam width Product’s width.
 * @apiParam height Product’s height.
 * @apiParam color Product’s color.
 * @apiParam options Product’s options.
 * @apiParam discount Product’s discount.
 * @apiParam discount_type Product’s discount type.
 * @apiParam tax Product’s tax.
 * @apiParam tax_type Product’s tax type.
 * @apiParam download Product’s download.
 * @apiParam download_name Product’s download name.
 * @apiParam deal Product’s deal.
 * @apiParam valuation Product’s valuation .
 * @apiParam download_num Product’s download num.
 * @apiParam requirements Product’s requirements.
 * @apiParam featured Product’s featured.
 * @apiParam view_date Product’s view date.
 * @apiParam view_count Product’s view count.
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
 * @apiParam code Product’s code.
 * @apiParam sku Product’s sku.
 * @apiParam upc Product’s upc.
 * @apiParam name Product’s name.
 * @apiParam tag Product’s tag.
 * @apiParam vendor_id Product’s vendor id.
 * @apiParam category_id Product’s category id.
 * @apiParam brand_id Product’s brand id.
 * @apiParam description Product’s description.
 * @apiParam short_description Product’s short description.
 * @apiParam unit_cost Product’s unit cost.
 * @apiParam unit_price Product’s unit price.
 * @apiParam alt_price Product’s alt price.
 * @apiParam shipping_cost Product’s shipping cost.
 * @apiParam image_sm Product’s small image.
 * @apiParam image_md Product’s medium image.
 * @apiParam image_lg Product’s large image.
 * @apiParam image_front Product’s front image.
 * @apiParam image_back Product’s back image.
 * @apiParam icon Product’s icon.
 * @apiParam unit Product’s unit.
 * @apiParam length Product’s length.
 * @apiParam width Product’s width.
 * @apiParam height Product’s height.
 * @apiParam color Product’s color.
 * @apiParam options Product’s options.
 * @apiParam discount Product’s discount.
 * @apiParam discount_type Product’s discount type.
 * @apiParam tax Product’s tax.
 * @apiParam tax_type Product’s tax type.
 * @apiParam download Product’s download.
 * @apiParam download_name Product’s download name.
 * @apiParam deal Product’s deal.
 * @apiParam valuation Product’s valuation .
 * @apiParam download_num Product’s download num.
 * @apiParam requirements Product’s requirements.
 * @apiParam featured Product’s featured.
 * @apiParam view_date Product’s view date.
 * @apiParam view_count Product’s view count.
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
