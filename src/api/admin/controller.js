/*
* @author 4Dcoder
*/

import Admin from "./model";
import { success, fail, notFound } from "./../../services/response/";


// Retrieve and return all admins from the database.
export function findAll(req, res) {
  Admin.find()
    .then(admins => success(res, 200, admins, "Records found!"))
    .catch(err => fail(res, 500, err.message || "Some error occurred while retrieving admins."));
}

// Find a single admin with a adminId
export function findOne(req, res) {
  Admin.findById(req.params.adminId)
    .then((admin) => {
      if (!admin) return notFound(res, `Admin not found with id ${req.params.adminId}`);
      return success(res, 200, admin, "Records found!");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        return notFound(res, `Admin not found with id ${req.params.adminId}`);
      }
      return fail(res, 500, `Error retrieving admin with id ${req.params.adminId}`);
    });
}

// Update a admin identified by the adminId in the request
export function update(req, res) {
  // Validate Request
  if (!req.body.publicAddress) {
    return fail(res, 500, "Admin publicAddress can not be empty");
  }
  const publicAddress = req.body.publicAddress || "";
  const username = req.body.username || "";
  const fullname = req.body.fullname || "";
  const phone = req.body.phone || "";
  const address = req.body.address || "";
  const email = req.body.email || "";

  const newUser = { username, fullname, phone, address, email, publicAddress };
  // Find admin and update it with the request body
  Admin.findByIdAndUpdate(req.params.adminId, newUser, { new: true })
    .then((admin) => {
      if (!admin) {
        return notFound(res, `Admin not found with id ${req.params.adminId}`);
      }
      return success(res, 200, admin, "Records found!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return notFound(res, `${err.message} Admin not found with id ${req.params.adminId}`);
      }
      return fail(res, 500, `${err.message} Error updating admin with id ${req.params.adminId}`);
    });
  return fail(res, 500, "Unknwon request!");
}

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
  const recordId = req.params.adminId || "";
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
