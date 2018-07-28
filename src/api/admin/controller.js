/*
* @author 4Dcoder
*/

import Admin, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response/";


// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Admin.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.adminId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Admin.findById(recordId)
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

// Update record identified by the Id in the request
export function update(req, res) {
  const recordId = req.params.adminId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let adminId;

  if (userType === "admin") {
    adminId = userId;
  } else {
    return fail(res, 422, `Only Admins are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.publicAddress) return fail(res, 422, "publicAddress cannot be empty and must be alphanumeric.");
  if (!data.username) return fail(res, 422, "username cannot be empty and must be alphanumeric.");
  if (!data.fullname) return fail(res, 422, "fullname cannot be empty and must be alphanumeric.");
  if (!data.phone) return fail(res, 422, "phone cannot be empty and must be alphanumeric.");
  if (!data.address) return fail(res, 422, "address cannot be empty and must be alphanumeric.");
  if (!data.email) return fail(res, 422, "email cannot be empty and must be alphanumeric.");

  const newObject = {};
  newObject.admin = adminId;
  if (data.publicAddress) newObject.publicAddress = data.publicAddress;
  if (data.username) newObject.username = data.username;
  if (data.fullname) newObject.fullname = data.fullname;
  if (data.phone) newObject.phone = data.phone;
  if (data.address) newObject.address = data.address;
  if (data.email) newObject.email = data.email;

  // Create a record
  const record = new Admin(newObject);

  // Find record and update it with id
  return Admin.findByIdAndUpdate(recordId, { record }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  const recordId = req.params.adminId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Admin.findByIdAndRemove(recordId)
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
