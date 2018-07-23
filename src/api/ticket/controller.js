
import Ticket from "./model";

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

// Retrieve and return all tickets from the database.
exports.findAll = (req, res) => {
  Ticket.find()
    .then((tickets) => {
      res.send(tickets);
    }).catch((err) => {
      res.status(500).send({
        ticket: err.ticket || "Some error occurred while retrieving tickets.",
      });
    });
};

// Find a single ticket with a ticketId
exports.findOne = (req, res) => {
  Ticket.findById(req.params.ticketId)
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
        ticket: `Error retrieving ticket with id ${req.params.ticketId}`,
      });
    });
};

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
  Ticket.findByIdAndRemove(req.params.ticketId)
    .then((ticket) => {
      if (!ticket) {
        res.status(404).send({
          ticket: `Ticket not found with id ${req.params.ticketId}`,
        });
      }
      res.send({ ticket: "Ticket deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          ticket: `Ticket not found with id ${req.params.ticketId}`,
        });
      }
      res.status(500).send({
        ticket: `Could not delete ticket with id ${req.params.ticketId}`,
      });
    });
};
