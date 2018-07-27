/*
* @author 4Dcoder
*/

import express from "express";
import * as ticket from "./controller";
import { isValidVendor } from "../auth/controller";

const router = express.Router();

/**
 * @api {post} /tickets Create ticket
 * @apiName CreateTicket
 * @apiGroup Ticket
 * @apiParam {String} access_token master access token.
 * @apiParam ticket_session Ticket's ticket_session.
 * @apiParam subject Ticket's subject.
 * @apiParam ticket Ticket's ticket.
 * @apiParam customer_id Ticket's customer_id.
 * @apiParam vendor_id Ticket's vendor_id.
 * @apiParam admin_id Ticket's admin_id.
 * @apiParam sent_by Ticket's sent_by.
 * @apiSuccess {Object} Ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 master access only.
 */
router.post("/tickets", isValidVendor, ticket.create);

/**
 * @api {get} /tickets Retrieve tickets
 * @apiName RetrieveTickets
 * @apiGroup Ticket
 * @apiSuccess {Object[]} rows List of Tickets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get("/tickets", isValidVendor, ticket.findAll);


/**
 * @api {get} /tickets/:id Retrieve ticket
 * @apiName RetrieveTicket
 * @apiGroup Ticket
 * @apiSuccess {Object} ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 */
router.get("/tickets/:ticketId", isValidVendor, ticket.findOne);

/**
 * @api {put} /tickets/:id Update ticket
 * @apiName UpdateTicket
 * @apiGroup Ticket
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam ticket_session Ticket's ticket_session.
 * @apiParam subject Ticket's subject.
 * @apiParam ticket Ticket's ticket.
 * @apiParam customer_id Ticket's customer_id.
 * @apiParam vendor_id Ticket's vendor_id.
 * @apiParam admin_id Ticket's admin_id.
 * @apiParam sent_by Ticket's sent_by.
 * @apiSuccess {Object} ticket Ticket's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ticket not found.
 * @apiError 401 master access only.
 */
router.put("/tickets/:ticketId", isValidVendor, ticket.update);

/**
 * @api {delete} /tickets/:id Delete ticket
 * @apiName DeleteTicket
 * @apiGroup Ticket
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Ticket not found.
 * @apiError 401 master access only.
 */
router.delete("/tickets/:ticketId", isValidVendor, ticket.delete);

export default router;
