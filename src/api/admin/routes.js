/*
* @author 4Dcoder
*/

import express from "express";
import * as admin from "./controller";
import * as init from "./init";
import { isValidAdmin } from "../auth/controller";

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


router.get("/init/admin", isValidAdmin, init.initAdmin);
router.get("/init/blog", isValidAdmin, init.initBlog);
router.get("/init/brand", isValidAdmin, init.initBrand);
router.get("/init/category", isValidAdmin, init.initCategory);
router.get("/init/coupon", isValidAdmin, init.initCoupon);
router.get("/init/currency", isValidAdmin, init.initCurrency);
router.get("/init/customer", isValidAdmin, init.initCustomer);
router.get("/init/language-list", isValidAdmin, init.initLanguageList);
router.get("/init/language", isValidAdmin, init.initLanguage);
router.get("/init/mail", isValidAdmin, init.initMail);
router.get("/init/media", isValidAdmin, init.initMedia);
router.get("/init/message", isValidAdmin, init.initMessage);
router.get("/init/order", isValidAdmin, init.initOrder);
router.get("/init/product", isValidAdmin, init.initProduct);
router.get("/init/product-extra", isValidAdmin, init.initProductExtra);
router.get("/init/review", isValidAdmin, init.initReview);
router.get("/init/setting", isValidAdmin, init.initSetting);
router.get("/init/slider", isValidAdmin, init.initSlider);
router.get("/init/stock", isValidAdmin, init.initStock);
router.get("/init/subscriber", isValidAdmin, init.initSubscriber);
router.get("/init/template", isValidAdmin, init.initTemplate);
router.get("/init/ticket", isValidAdmin, init.initTicket);
router.get("/init/vendor", isValidAdmin, init.initVendor);

/*
router.get("/user/:id", (req, res, next) => {
  console.log("ID:", req.params.id);
  next();
}, (req, res, next) => {
  res.send("User Info");
});
*/
export default router;
