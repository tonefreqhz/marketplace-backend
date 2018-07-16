/**
 * @api {post} /:userType/auth/:authType Authenticate
 * @apiName Authenticate
 * @apiGroup Auth
 * @apiHeader {String} Authorization Basic authorization contentType = application/json.
 * @apiParams {String} url parameters with userType and authType.
 * @apiBody {String} form with signature and publicAddress.
 * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
 * @apiSuccess (Success 201) {Object} user Current user's data.
 * @apiError 401 Valid users access only or invalid credentials.
 */

import express from "express";

import * as authentication from "./controller";

const router = express.Router();

// Retrieve a single admin with publicAddress ^(0x)?[0-9a-fA-F]{40}$
router.get("/:userType/:authType/publicaddress/:publicAddress", authentication.find);

router.post("/:userType/auth/:authType", authentication.auth);

export default router;
