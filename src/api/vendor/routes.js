/*
 * @author 4Dcoder
*/

import express from "express";
import * as vendor from "./controller";
import * as auth from "../auth/controller";

const router = express.Router();

/**
 * @api {get} /vendors Retrieve vendors
 * @apiName RetrieveVendors
 * @apiGroup Vendor
 * @apiSuccess {Object[]} rows List of Vendors.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/vendors", auth.isValidAdmin, vendor.findAll);

/**
 * @api {get} /vendors/:id Retrieve vendor
 * @apiName RetrieveVendor
 * @apiGroup Vendor
 * @apiSuccess {Object} vendor Vendor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vendor not found.
 */
router.get("/vendors/:vendorId", vendor.findOne);
router.get("/vendors/domain/:domainName", vendor.findOneDomain);

/**
 * @api {put} /vendors/:id Update vendor
 * @apiName UpdateVendor
 * @apiGroup Vendor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam businessName Vendor's businessName.
 * @apiParam currency Vendor's currency.
 * @apiParam language Vendor's language.
 * @apiParam fullname Vendor's fullname.
 * @apiParam email Vendor's email.
 * @apiParam password Vendor's password.
 * @apiParam tagline Vendor's tagline.
 * @apiParam address Vendor's address.
 * @apiParam details Vendor's details.
 * @apiParam facebook Vendor's facebook.
 * @apiParam skype Vendor's skype.
 * @apiParam googlePlus Vendor's googlePlus.
 * @apiParam twitter Vendor's twitter.
 * @apiParam youtube Vendor's youtube.
 * @apiParam pinterest Vendor's pinterest.
 * @apiParam phone Vendor's phone.
 * @apiParam tag Vendor's tag.
 * @apiParam description Vendor's description.
 * @apiParam country Vendor's country.
 * @apiParam city Vendor's city.
 * @apiParam zip Vendor's zip.
 * @apiParam state Vendor's state.
 * @apiParam theme Vendor's theme.
 * @apiParam homepage Vendor's homepage.
 * @apiParam template.product Vendor's product's template style.
 * @apiParam template.productDetails Vendor's productDetail's template style.
 * @apiParam template.profile Vendor's profile's template style.
 * @apiParam template.blog Vendor's blog's template style.
 * @apiParam template.mail Vendor's mail's template style.
 * @apiParam template.invoice Vendor's invoice's template style.
 * @apiParam template.invoice Vendor's ticket's template style.
 * @apiParam viewCount Vendor's viewCount.
 * @apiParam lastAccess Vendor's lastAccess.
 * @apiSuccess {Object} product Vendor's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Vendor not found.
 * @apiError 401 master access only.
 */
router.put("/vendors/:vendorId", auth.isValidVendor, vendor.update);

/**
 * @api {delete} /vendors/:id Delete vendor
 * @apiName DeleteVendor
 * @apiGroup Vendor
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Vendor not found.
 * @apiError 401 master access only.
 */
router.delete("/vendors/:vendorId", vendor.delete);

export default router;
