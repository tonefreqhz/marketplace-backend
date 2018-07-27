
import Coupon from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Coupon
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({
      message: "Coupon code can not be empty",
    });
  }

  // Create a Coupon
  const coupon = new Coupon({
    title: req.body.title || "Untitled Coupon",
    code: req.body.code,
    spec_array: req.body.spec_array,
    vendor_id: req.body.vendor_id,
    till: new Date(req.body.till),
  });

  // Save Coupon in the database
  coupon.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Coupon.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Coupon.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.couponId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Coupon.findById(req.params.recordId)
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

// Update a coupon identified by the couponId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.code) {
    res.status(400).send({
      message: "Coupon code can not be empty",
    });
  }

  // Find coupon and update it with the request body
  Coupon.findByIdAndUpdate(req.params.couponId, {
    title: req.body.title || "Untitled Coupon",
    code: req.body.code,
    spec_array: req.body.spec_array,
    vendor_id: req.body.vendor_id,
    till: new Date(req.body.till),
  }, { new: true })
    .then((coupon) => {
      if (!coupon) {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.send(coupon);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Coupon not found with id ${req.params.couponId}`,
        });
      }
      res.status(500).send({
        message: `Error updating coupon with id ${req.params.couponId}`,
      });
    });
};

// Delete a coupon with the specified couponId in the request
exports.delete = (req, res) => {
  const recordId = req.params.couponId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Coupon.findByIdAndRemove(recordId)
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
