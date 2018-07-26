
import Vendor from "./model";
import { success, fail, notFound } from "../../services/response/index";

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Vendor.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.vendorId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Vendor.findById(req.params.recordId)
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


// Find a single vendor with a vendorId
export function findVendorById(vendorId) {
  return Vendor
    .findById(vendorId)
    .then((vendor) => {
      if (!vendor) return false;
      return vendor;
    })
    .catch(err => err);
}

// Find a single vendor with a domainName
export function findVendorByDomain(domainName) {
  return Vendor
    .findOne({ domain_name: domainName })
    .then((vendor) => {
      if (!vendor) return false;
      return vendor;
    })
    .catch(err => err);
}

// Update a vendor identified by the vendorId in the request
export function update(req, res) {
  // Validate Request
  if (!req.body.content) {
    return fail(res, 500, "Vendor content can not be empty");
  }

  const newVendor = {};
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  for (let i = 0; i <= keys.length; i += 1) {
    if (values[i] !== null && values[i] !== ""
    && ["updated", "updatedAt", "createdAt", "__v", "_id"].indexOf(keys[i]) === -1) {
      newVendor.keys[i] = values[i];
    }
  }

  // Find vendor and update it with the request body
  return Vendor
    .findByIdAndUpdate(req.params.vendorId, { newVendor }, { new: true })
    .then((vendor) => {
      if (!vendor) {
        return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
      }
      return res.send(vendor);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
      }
      return fail(res, 500, `Error updating vendor with id ${req.params.vendorId}`);
    });
}

// Delete a vendor with the specified vendorId in the request
exports.delete = (req, res) => {
  const recordId = req.params.vendorId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Vendor.findByIdAndRemove(recordId)
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
