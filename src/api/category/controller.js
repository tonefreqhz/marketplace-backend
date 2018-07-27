
import Category, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new record
export function create(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.name) return fail(res, 422, "name cannot be empty and must be alphanumeric.");
  if (!data.description) return fail(res, 422, "description cannot be empty and must be alphanumeric.");
  if (!data.kind) return fail(res, 422, "kind cannot be empty and must be alphanumeric.");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.name) newObject.name = data.name;
  if (data.description) newObject.description = data.description;
  if (data.kind) newObject.kind = data.kind;
  if (data.parent) newObject.parent = data.parent;

  // Create a record
  const record = new Category(newObject);

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
  return Category.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.categoryId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Category.findById(recordId)
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
  const recordId = req.params.categoryId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.name) return fail(res, 422, "name cannot be empty and must be alphanumeric.");
  if (!data.description) return fail(res, 422, "description cannot be empty and must be alphanumeric.");
  if (!data.kind) return fail(res, 422, "kind cannot be empty and must be alphanumeric.");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.name) newObject.name = data.name;
  if (data.description) newObject.description = data.description;
  if (data.kind) newObject.kind = data.kind;
  if (data.parent) newObject.parent = data.parent;

  // Find record and update it with id
  return Category.findByIdAndUpdate(recordId, { newObject }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}


// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  const recordId = req.params.categoryId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Category.findByIdAndRemove(recordId)
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
