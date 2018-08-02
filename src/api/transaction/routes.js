/*
* @author 4Dcoder
*/

import express from "express";
import * as transaction from "./controller";
import { isValidCustomer } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /transactions Create transaction
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam {String} access_token master access token.
 * @apiParam transaction customer's id.
 * @apiSuccess {Object} transaction id.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 transaction not found.
 * @apiError 401 authenticated user access only.
 */
router.post("/transactions/customer", isValidCustomer, transaction.create);


export default router;
