/*
* @author 4Dcoder
*/

import Arbitration from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Arbitration
exports.create = (req, res) => {
  // Validate request
  if (!req.body.order_id) {
    res.status(400).send({
      message: "Arbitration sales order cannot be empty",
    });
  }

  // Create a Arbitration
  const arbitration = new Arbitration({
    order_id: req.body.order_id,
    vendor_id: req.body.vendor_id,
    customer_id: req.body.customer_id,
    amount: req.body.amount,
    customer_complaint: req.body.customer_complaint,
    vendor_complaint: req.body.vendor_complaint,
    arbitration_status: req.body.arbitration_status,
    arbiter: req.body.arbiter,
    verdict: req.body.verdict,
  });

  // Save Arbitration in the database
  arbitration.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Arbitration.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Arbitration.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.arbitrationId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Arbitration.findById(req.params.recordId)
    .then((result) => {
      if (!result) return notFound(res, 404, "Error record not found.");
      return success(res, 200, result, "retrieving record was successfully!");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, 404, `Error retrieving record.\r\n${err.message}`);
      }
      return fail(res, 500, `Error retrieving record.\r\n${err.message}`);
    });
}

// Update a arbitration identified by the arbitrationId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.order_id) {
    res.status(400).send({
      message: "Arbitration order can not be empty",
    });
  }

  // Find arbitration and update it with the request body
  Arbitration.findByIdAndUpdate(req.params.arbitrationId, {
    order_id: req.body.order_id,
    vendor_id: req.body.vendor_id,
    customer_id: req.body.customer_id,
    amount: req.body.amount,
    customer_complaint: req.body.customer_complaint,
    vendor_complaint: req.body.vendor_complaint,
    arbitration_status: req.body.arbitration_status,
    arbiter: req.body.arbiter,
    verdict: req.body.verdict,
  }, { new: true })
    .then((arbitration) => {
      if (!arbitration) {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.send(arbitration);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Arbitration not found with id ${req.params.arbitrationId}`,
        });
      }
      res.status(500).send({
        message: `Error updating arbitration with id ${req.params.arbitrationId}`,
      });
    });
};

// Delete a arbitration with the specified arbitrationId in the request
exports.delete = (req, res) => {
  const recordId = req.params.arbitrationId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Arbitration.findByIdAndRemove(recordId)
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
