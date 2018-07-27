
import Message, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Message
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kind) {
    res.status(400).send({
      message: "Message kind can not be empty",
    });
  }

  // Create a Message
  const message = new Message({
    kind: req.body.kind,
    message_session: req.body.message_session,
    message_between: req.body.message_between,
    visitor_name: req.body.visitor_name,
    visitor_email: req.body.visitor_email,
    subject: req.body.subject,
    message: req.body.message,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    admin_id: req.body.admin_id,
    sent_by: req.body.sent_by,
  });

  // Save Message in the database
  message.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Message.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.messageId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Message.findById(recordId)
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

// Update a message identified by the messageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.kind) {
    res.status(400).send({
      message: "Message kind can not be empty",
    });
  }

  // Find message and update it with the request body
  Message.findByIdAndUpdate(req.params.messageId, {
    kind: req.body.kind,
    message_session: req.body.message_session,
    message_between: req.body.message_between,
    visitor_name: req.body.visitor_name,
    visitor_email: req.body.visitor_email,
    subject: req.body.subject,
    message: req.body.message,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    admin_id: req.body.admin_id,
    sent_by: req.body.sent_by,
  }, { new: true })
    .then((message) => {
      if (!message) {
        res.status(404).send({
          message: `Message not found with id ${req.params.messageId}`,
        });
      }
      res.send(message);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Message not found with id ${req.params.messageId}`,
        });
      }
      res.status(500).send({
        message: `Error updating message with id ${req.params.messageId}`,
      });
    });
};

// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
  const recordId = req.params.messageId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Message.findByIdAndRemove(recordId)
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
