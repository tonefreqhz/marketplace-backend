/**
 * @author 4Decoder
 */

import express from "express";

import * as authentication from "./controller";

const router = express.Router();

/**
* @api {get} /:userType/:authType/publicaddress/:publicAddress Authenticate
* @apiName RetrieveNonce
* @apiGroup Authenticate
* @apiPermission master
* @apiParam {String} access_token master access token.
* @apiParam userType User’s user type (Customer | Vendor | Admin).
* @apiParam authType User’s authentication type.
* @apiParam publicaddress User’s publicaddress.
* @apiSuccess {Object} user User's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 User not found.
* @apiError 401 master access only.
*/
// Retrieve a single user with publicAddress ^(0x)?[0-9a-fA-F]{40}$
router.get("/:userType/:authType/publicaddress/:publicAddress", authentication.find);

/**
* @api {post} /:userType/auth/:authType Authenticate
* @apiName Authenticate
* @apiGroup Authenticate
* @apiPermission master
* @apiParam {String} access_token master access token.
* @apiParam userType User’s user type (Customer | Vendor | Admin).
* @apiParam authType User’s authentication type.
* @apiParam publicaddress User’s publicaddress.
* @apiSuccess {Object} user User's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 User not found.
* @apiError 401 master access only.
*/
router.post("/:userType/auth/:authType", authentication.auth);

export default router;
