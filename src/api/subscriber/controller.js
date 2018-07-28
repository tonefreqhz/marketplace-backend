
import Subscriber, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Subscriber
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Subscriber email can not be empty",
    });
  }

  // Create a Subscriber
  const subscriber = new Subscriber({
    email: req.body.email,
    frequency: req.body.frequency,
    interest: req.body.interest,
  });

  // Save Subscriber in the database
  subscriber.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Subscriber.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Subscriber.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.subscriberId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Subscriber.findById(recordId)
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

// Update a subscriber identified by the subscriberId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.email) {
    res.status(400).send({
      message: "Subscriber email can not be empty",
    });
  }

  // Find subscriber and update it with the request body
  Subscriber.findByIdAndUpdate(req.params.subscriberId, {
    email: req.body.email,
    frequency: req.body.frequency,
    interest: req.body.interest,
  }, { new: true })
    .then((subscriber) => {
      if (!subscriber) {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.send(subscriber);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Subscriber not found with id ${req.params.subscriberId}`,
        });
      }
      res.status(500).send({
        message: `Error updating subscriber with id ${req.params.subscriberId}`,
      });
    });
};

// Delete a subscriber with the specified subscriberId in the request
exports.delete = (req, res) => {
  const recordId = req.params.subscriberId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Subscriber.findByIdAndRemove(recordId)
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
