
import Currency, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new record
export function create(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let adminId;

  if (userType === "admin") {
    adminId = userId;
  } else {
    return fail(res, 422, `Only Admins are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.name) return fail(res, 422, "name cannot be empty and must be alphanumeric.");
  if (!data.code) return fail(res, 422, "code cannot be empty and must be alphanumeric.");
  if (!data.description) return fail(res, 422, "description cannot be empty and must be alphanumeric.");
  if (!data.kind) return fail(res, 422, "Currency type cannot be empty and must be fiat or digital.");
  if (!data.symbol) return fail(res, 422, "symbol cannot be empty and must be alphanumeric.");
  if (!data.exchange) return fail(res, 422, "exchange cannot be empty and must be a Numeric.");

  const newObject = {};
  newObject.admin = adminId;
  if (data.name) newObject.name = data.name;
  if (data.code) newObject.code = data.code;
  if (data.description) newObject.description = data.description;
  if (data.kind) newObject.kind = data.kind;
  if (data.symbol) newObject.symbol = data.symbol;
  if (data.exchange) newObject.exchange = data.exchange;

  // Create a record
  const record = new Currency(newObject);

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
  return Currency.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.currencyId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Currency.findById(recordId)
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


// Update record identified by the Id in the request
export function update(req, res) {
  const recordId = req.params.couponId || "";
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
  if (!data.name) return fail(res, 422, "name cannot be empty and must be alphanumeric.");
  if (!data.code) return fail(res, 422, "code cannot be empty and must be alphanumeric.");
  if (!data.description) return fail(res, 422, "description cannot be empty and must be alphanumeric.");
  if (!data.kind) return fail(res, 422, "Currency type cannot be empty and must be fiat or digital.");
  if (!data.symbol) return fail(res, 422, "symbol cannot be empty and must be alphanumeric.");
  if (!data.exchange) return fail(res, 422, "exchange cannot be empty and must be a Numeric.");

  const newObject = {};
  newObject.admin = adminId;
  if (data.name) newObject.name = data.name;
  if (data.code) newObject.code = data.code;
  if (data.description) newObject.description = data.description;
  if (data.kind) newObject.kind = data.kind;
  if (data.symbol) newObject.symbol = data.symbol;
  if (data.exchange) newObject.exchange = data.exchange;

  // Create a record
  const record = new Currency(newObject);

  // Find record and update it with id
  return Currency.findByIdAndUpdate(recordId, { record }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Delete a currency with the specified currencyId in the request
exports.delete = (req, res) => {
  const recordId = req.params.currencyId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Currency.findByIdAndRemove(recordId)
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
