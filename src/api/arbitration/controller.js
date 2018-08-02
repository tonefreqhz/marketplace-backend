/*
* @author 4Dcoder
*/

import Arbitration, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new record
export function create(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to add media not ${userType}`);
  }

  // Validate request
  if (!data.order) return fail(res, 422, "order cannot be empty and must be alphanumeric.");
  if (!data.vendor) return fail(res, 422, "vendor cannot be empty and must be alphanumeric.");
  if (!data.customer) return fail(res, 422, "customer cannot be empty and must be alphanumeric");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.order) newObject.order = data.order;
  if (data.customer) newObject.customer = data.customer;
  if (data.amount) newObject.amount = data.amount;
  if (data.customerComplaint) newObject.customerComplaint = data.customerComplaint;
  if (data.vendorComplaint) newObject.vendorComplaint = data.vendorComplaint;
  if (data.arbitrationStatus) newObject.arbitrationStatus = data.arbitrationStatus;
  if (data.arbiter) newObject.arbiter = data.arbiter;
  if (data.verdict) newObject.verdict = data.verdict;

  // Create a record
  const record = new Arbitration(newObject);

  // Save Product in the database
  return record.save()
    .then((result) => {
      if (!result) return notFound(res, "Error: newly submitted record not found");
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error creating record.\r\n${err.message}`));
}

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Arbitration.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.arbitrationId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Arbitration.findById(recordId)
    .then((result) => {
      if (!result) return notFound(res, "Error record not found.");
      return success(res, 200, result, "retrieving record was successfully!");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, `Error retrieving record.\r\n${err.message}`);
      }
      return fail(res, 500, `Error retrieving record.\r\n${err.message}`);
    });
}

// Update a record given by id
export function update(req, res) {
  const recordId = req.params.arbitrationId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to add media not ${userType}`);
  }

  // Validate request
  if (!data.order) return fail(res, 422, "order cannot be empty and must be alphanumeric.");
  if (!data.vendor) return fail(res, 422, "vendor cannot be empty and must be alphanumeric.");
  if (!data.customer) return fail(res, 422, "customer cannot be empty and must be alphanumeric");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.order) newObject.order = data.order;
  if (data.customer) newObject.customer = data.customer;
  if (data.amount) newObject.amount = data.amount;
  if (data.customerComplaint) newObject.customerComplaint = data.customerComplaint;
  if (data.vendorComplaint) newObject.vendorComplaint = data.vendorComplaint;
  if (data.arbitrationStatus) newObject.arbitrationStatus = data.arbitrationStatus;
  if (data.arbiter) newObject.arbiter = data.arbiter;
  if (data.verdict) newObject.verdict = data.verdict;

  // Find arbitration and update it with the request body
  return Arbitration.findByIdAndUpdate(recordId, { ...newObject }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Update a record given by id
export function modify(req, res) {
  const recordId = req.params.arbitrationId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to add media not ${userType}`);
  }

  const newObject = {};
  if (data.arbitrationStatus) newObject.arbitrationStatus = data.arbitrationStatus;
  if (data.arbiter) newObject.arbiter = data.arbiter;
  if (data.verdict) newObject.verdict = data.verdict;

  // Find arbitration and update it with the request body
  return Arbitration.findByIdAndUpdate(recordId, { ...newObject }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Delete a arbitration with the specified arbitrationId in the request
exports.delete = (req, res) => {
  const recordId = req.params.arbitrationId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Arbitration.findByIdAndRemove(recordId)
    .then((record) => {
      if (!record) return notFound(res, `Record not found with id ${recordId}`);
      return success(res, 200, [], "Record deleted successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Error: record not found with id ${recordId}.\r\n${err.message}`);
      }
      return fail(res, 500, `Error: could not delete record with id ${recordId}.\r\n${err.message}`);
    });
};
