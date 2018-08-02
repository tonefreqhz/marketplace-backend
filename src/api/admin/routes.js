/*
* @author 4Dcoder
*/

import express from "express";
import * as admin from "./controller";
import * as init from "./init";
import { isValidAdmin, isValidVendor } from "../auth/controller";

const router = express.Router();

/**
 * @api {get} /admins Retrieve admins
 * @apiName RetrieveAdmins
 * @apiGroup Admin
 * @apiSuccess {Object[]} rows List of Admins.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/admins", isValidAdmin, admin.findAll);


/**
 * @api {get} /admins/:id Retrieve admin
 * @apiName RetrieveAdmin
 * @apiGroup Admin
 * @apiSuccess {Object} admin Admin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admin not found.
 */
router.get("/admins/:adminId", isValidAdmin, admin.findOne);

/**
 * @api {put} /admins/:id Update admin
 * @apiName UpdateAdmin
 * @apiGroup Admin
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam username Admin’s username.
 * @apiParam fullname Admin’s fullname.
 * @apiParam phone Admin’s phone.
 * @apiParam email Admin’s email.
 * @apiSuccess {Object} admin Admin's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Admin not found.
 * @apiError 401 master access only.
 */
router.put("/admins/:adminId", isValidAdmin, admin.update);

router.patch("/admins/:adminId/standing/:standing", isValidAdmin, admin.update);

/**
 * @api {delete} /admins/:id Delete admin
 * @apiName DeleteAdmin
 * @apiGroup Admin
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Admin not found.
 * @apiError 401 master access only.
 */
router.delete("/admins/:adminId", isValidAdmin, admin.delete);


router.get("/init/admin", isValidVendor, init.initAdmin);
router.get("/init/blog", isValidVendor, init.initBlog);
router.get("/init/brand", isValidVendor, init.initBrand);
router.get("/init/category", isValidVendor, init.initCategory);
router.get("/init/coupon", isValidVendor, init.initCoupon);
router.get("/init/currency", isValidVendor, init.initCurrency);
router.get("/init/customer", isValidVendor, init.initCustomer);
router.get("/init/language-list", isValidVendor, init.initLanguageList);
router.get("/init/language", isValidVendor, init.initLanguage);
router.get("/init/mail", isValidVendor, init.initMail);
router.get("/init/media", isValidVendor, init.initMedia);
router.get("/init/message", isValidVendor, init.initMessage);
router.get("/init/order", isValidVendor, init.initOrder);
router.get("/init/product", isValidVendor, init.initProduct);
router.get("/init/review", isValidVendor, init.initReview);
router.get("/init/setting", isValidVendor, init.initSetting);
router.get("/init/slider", isValidVendor, init.initSlider);
router.get("/init/stock", isValidVendor, init.initStock);
router.get("/init/subscriber", isValidVendor, init.initSubscriber);
router.get("/init/template", isValidVendor, init.initTemplate);
router.get("/init/ticket", isValidVendor, init.initTicket);
router.get("/init/vendor", isValidVendor, init.initVendor);

/*
router.get("/user/:id", (req, res, next) => {
  console.log("\r\n ******************* Test Admin Routes **********\r\n");
  next();
}, (req, res, next) => {
  res.send("User Info");
});
*/
export default router;
