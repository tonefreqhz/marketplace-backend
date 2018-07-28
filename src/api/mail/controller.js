
import Mail, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Mail
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Mail name can not be empty",
    });
  }

  // Create a Mail
  const mail = new Mail({
    name: req.body.name || "Untitled Mail",
    mail_title: req.body.mail_title,
    mail_subject: req.body.mail_subject,
    mail_body: req.body.mail_body,
  });

  // Save Mail in the database
  mail.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Mail.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Mail.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.mailId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Mail.findById(recordId)
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

// Update a mail identified by the mailId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Mail name can not be empty",
    });
  }

  // Find mail and update it with the request body
  Mail.findByIdAndUpdate(req.params.mailId, {
    name: req.body.name || "Untitled Mail",
    mail_title: req.body.mail_title,
    mail_subject: req.body.mail_subject,
    mail_body: req.body.mail_body,
  }, { new: true })
    .then((mail) => {
      if (!mail) {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.send(mail);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Mail not found with id ${req.params.mailId}`,
        });
      }
      res.status(500).send({
        message: `Error updating mail with id ${req.params.mailId}`,
      });
    });
};

// Delete a mail with the specified mailId in the request
exports.delete = (req, res) => {
  const recordId = req.params.mailId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Mail.findByIdAndRemove(recordId)
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
