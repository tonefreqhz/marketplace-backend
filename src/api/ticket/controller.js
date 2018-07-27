
import Ticket from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Ticket
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kind) {
    res.status(400).send({
      ticket: "Ticket kind can not be empty",
    });
  }

  // Create a Ticket
  const ticket = new Ticket({
    ticket_session: req.body.ticket_session,
    subject: req.body.subject,
    ticket: req.body.ticket,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    admin_id: req.body.admin_id,
    raised_by: req.body.raised_by,
  });

  // Save Ticket in the database
  ticket.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        ticket: err.ticket || "Some error occurred while creating the Ticket.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Ticket.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.ticketId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Ticket.findById(req.params.recordId)
    .then((result) => {
      if (!result) return notFound(res, `Error: record not found with id ${recordId}.`);
      return success(res, 200, result, `retrieving record was successfully with id ${recordId}.`);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, `Error retrieving record with id ${recordId}.\r\n${err.message}`);
      }
      return fail(res, 500, `Error retrieving record with id ${recordId}.\r\n${err.message}`);
    });
}

// Update a ticket identified by the ticketId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.kind) {
    res.status(400).send({
      ticket: "Ticket kind can not be empty",
    });
  }

  // Find ticket and update it with the request body
  Ticket.findByIdAndUpdate(req.params.ticketId, {
    ticket_session: req.body.ticket_session,
    subject: req.body.subject,
    ticket: req.body.ticket,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    admin_id: req.body.admin_id,
    raised_by: req.body.raised_by,
  }, { new: true })
    .then((ticket) => {
      if (!ticket) {
        res.status(404).send({
          ticket: `Ticket not found with id ${req.params.ticketId}`,
        });
      }
      res.send(ticket);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          ticket: `Ticket not found with id ${req.params.ticketId}`,
        });
      }
      res.status(500).send({
        ticket: `Error updating ticket with id ${req.params.ticketId}`,
      });
    });
};

// Delete a ticket with the specified ticketId in the request
exports.delete = (req, res) => {
  const recordId = req.params.ticketId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Ticket.findByIdAndRemove(recordId)
    .then((record) => {
      if (!record) return notFound(res, `Record not found with id ${recordId}`);
      return success(res, 200, [], "Record deleted successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Error: record not found with id ${recordId}\r\n${err.message}`);
      }
      return fail(res, 500, `Error: could not delete record with id ${recordId}\r\n${err.message}`);
    });
};

