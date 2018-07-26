/*
* @author 4Dcoder
* @data 16-July-2018
*/

import express from "express";
import * as product from "./controller";
import { isValidAdmin, isValidVendor } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /products Create product
 * @description New created products are pending (an inactive state). Pending products require
 * user action to become active without any admin intervention. User action to activate
 * product include resolve issues relating to suspended vendor, brand, or category
 * A product can be pending because of insifficient product information such
 * lack of image, unit_price.
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiParam {String} code Product’s (unique) code.
 * @apiParam {String} sku Product’s sku (unique) Stock-Keeping Unit.
 * @apiParam {String} upc Product’s upc (unique) Universal Product Code.
 * @apiParam {String} name Product’s (required) name.
 * @apiParam {String} tag Product’s tag.
 * @apiParam {String} vendor_id Product’s (required) vendor id.
 * @apiParam {String} category_id Product’s (required) category id.
 * @apiParam {String} brand_id Product’s brand id.
 * @apiParam {String} description Product’s (required) description.
 * @apiParam {String} short_description Product’s (required) short description.
 * @apiParam {Number} unit_cost Product’s (required) unit cost.
 * @apiParam {Number} unit_price Product’s (required) unit price.
 * @apiParam {Number} alt_price Product’s alt price.
 * @apiParam {Number} shipping_cost Product’s shipping cost.
 * @apiParam {String} unit Product’s unit (dozen, carton, set, pack).
 * @apiParam {String} length Product’s length (metre, inches).
 * @apiParam {String} width Product’s width (metre, inches).
 * @apiParam {String} height Product’s height (metre, inches).
 * @apiParam {String} color Product’s color (green, magenta).
 * @apiParam {String} options Product’s options (siblings).
 * @apiParam {Number} discount Product’s (default:0) discount.
 * @apiParam {Enum} discount_type Product’s discount type ["fixed", "percent"] default: "percent".
 * @apiParam {Number} tax Product’s (default:0) tax.
 * @apiParam {Enum} tax_type Product’s tax type ["fixed", "percent"] default: "percent".
 * @apiParam {Boolean} download Product’s download.
 * @apiParam {String} download_name Product’s download name.
 * @apiParam {Boolean} deal Product’s deal.
 * @apiParam {Enum} valuation Product’s valuation ["FIFO", "LIFO", "AVCO"].
 * @apiParam {Number} download_num Product’s (default:0) download num.
 * @apiParam {Boolean} featured Product’s featured.
 * @apiParam {Date} view_date Product’s view date.
 * @apiParam {Number} view_count Product’s view count.
 * @apiParam {String} standing is enum ["active", "pending", "remove", "restore", "trash"],
 * @apiParam {Boolean} action default true. When faulse, product cannot be updated
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.post("/products", isValidVendor, product.create);

/**
 * @api {get} vendor/:vendorDomain/products Retrieve products
 * @description retrieve all products for a given vendor. Unauthenticated route
 * the route is authenticated with vendors credentials
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiParam {String} vendorDomain products’ vendors (unique) subdomain.
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */

router.get("/vendor/:vendorDomain/products", product.findAll);

/**
 * @api {get} vendor/:vendorDomain/products/kind/:kind Retrieve kinds of products
 * @description retrieve certain kinds of products a given vendor. Unauthenticated route
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiParam {String} vendorDomain products’ vendors (unique) subdomain.
 * @apiParam {String} kind products’ query property [ normal | deal | feature | popular | latest]
 * @apiSuccess {Object[]} rows List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/vendor/:vendorDomain/products/:kind", product.findAll);

/**
 * @api {get} /products/:id Retrieve any product.
 * @description retrieve any product. Unauthenticated route
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiParam {String} productId product's (unique) Id.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get("/products/:productId", product.findOne);

/**
 * @api {get} /products/operations/[:productIds] Retrieve multiple products
 * @description retrieve products for a given array of product id sent in diff ways
 *  1. JSON format: get http://server/url?array=["foo","bar"] -> let idArray = JSON.parse(req.query.array);
 *  2. CSV format: get http://server/url?array=foo,bar -> idArray = req.query.array.split(",");
 *  3. Percent Encoding & Repeat array: get http://server/url?arr[]=foo&arr[]=bar&arr[]=cat -> idArray = req.query.arr;
 *  4. Slashes: get http://server/url/foo/bar/... ->  app.get('/url/(:arr)*', function(req, res) ->
 *  idArray = [req.params.arr].concat(req.params[0].split("/").slice(1));
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiParam {Array} productIds array of strings of unique product's Id
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
// router.get("/products/operations/(:productIds)*", product.findSome);
router.get("/products/operations/:productIds(*)", product.findSome);

/**
 * @api {put} /products/:id Update product
 * @description update a product. Authenticated route for admin/vendor
 * Vendors can only update product(s) she owns and product action is true and standing is not trash.
 * Vendors can remove products from store, restore it and trash (remove|restore|trash).
 * Trashed products are only delete by later by admin if the product is not found
 * in any transanction such as order and abitration.
 * Admins only modify products action (status) namely: true | false
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiParam {String} code Product’s (unique) code.
 * @apiParam {String} sku Product’s sku (unique) Stock-Keeping Unit.
 * @apiParam {String} upc Product’s upc (unique) Universal Product Code.
 * @apiParam {String} name Product’s (required) name.
 * @apiParam {String} tag Product’s tag.
 * @apiParam {String} vendor_id Product’s (required) vendor id.
 * @apiParam {String} category_id Product’s (required) category id.
 * @apiParam {String} brand_id Product’s brand id.
 * @apiParam {String} description Product’s (required) description.
 * @apiParam {String} short_description Product’s (required) short description.
 * @apiParam {Number} unit_cost Product’s (required) unit cost.
 * @apiParam {Number} unit_price Product’s (required) unit price.
 * @apiParam {Number} alt_price Product’s alt price.
 * @apiParam {Number} shipping_cost Product’s shipping cost.
 * @apiParam {String} unit Product’s unit (dozen, carton, set, pack).
 * @apiParam {String} length Product’s length (metre, inches).
 * @apiParam {String} width Product’s width (metre, inches).
 * @apiParam {String} height Product’s height (metre, inches).
 * @apiParam {String} color Product’s color (green, magenta).
 * @apiParam {String} options Product’s options (siblings).
 * @apiParam {Number} discount Product’s (default:0) discount.
 * @apiParam {Enum} discount_type Product’s discount type ["fixed", "percent"] default: "percent".
 * @apiParam {Number} tax Product’s (default:0) tax.
 * @apiParam {Enum} tax_type Product’s tax type ["fixed", "percent"] default: "percent".
 * @apiParam {Boolean} download Product’s download.
 * @apiParam {String} download_name Product’s download name.
 * @apiParam {Boolean} deal Product’s deal.
 * @apiParam {Enum} valuation Product’s valuation ["FIFO", "LIFO", "AVCO"].
 * @apiParam {Number} download_num Product’s (default:0) download num.
 * @apiParam {Boolean} featured Product’s featured.
 * @apiParam {Date} view_date Product’s view date.
 * @apiParam {Number} view_count Product’s view count.
 * @apiParam {String} standing is enum ["active", "pending", "remove", "restore", "trash"],
 * @apiParam {Boolean} action default true. When faulse, product cannot be updated
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 master access only.
 */
router.put("/products/:productId", isValidAdmin, product.update);
router.put("/vendor/products/:productId", isValidVendor, product.update);

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
router.delete("/products/:productId", isValidAdmin, product.delete);
router.delete("/vendor/products/:productId", isValidVendor, product.delete);

export default router;
