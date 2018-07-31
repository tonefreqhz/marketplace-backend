
import Stock, { ObjectId } from "./model";
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
  if (!data.vendor) return fail(res, 422, "vendor id cannot be empty.");
  if (!ObjectId.isValid(data.vendor)) return fail(res, 422, "Invalid vendor Id");
  if (!data.product) return fail(res, 422, "stock product cannot be empty.");
  if (!data.orderNum) return fail(res, 422, "stock orderNum cannot be empty");
  if (!(["add", "destroy"].indexOf(data.kind) >= 0)) {
    return fail(res, 422, "kind of stock operation must be either of add, or destroy");
  }
  if (!data.page) return fail(res, 422, "slide page cannot be empty");
  if (!(["text", "image"].indexOf(data.page) >= 0)) {
    return fail(res, 422, "slide page must be either of product, brand, category or blog.");
  }
  if (!data.quantity) return fail(res, 422, "stock quantity cannot be empty");
  if (!data.available) return fail(res, 422, "stock available cannot be empty");
  if (!data.unitCost) return fail(res, 422, "stock unitCost must be of type Array");
  if (!data.unitPrice) return fail(res, 422, "stock unitPrice cannot be empty");
  if (!data.description) return fail(res, 422, "stock description cannot be empty");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.product) newObject.product = data.product;
  if (data.orderNum) newObject.orderNum = data.orderNum;
  if (data.quantity) newObject.quantity = data.quantity;
  if (data.available) newObject.available = data.available;
  if (data.unitCost) newObject.unitCost = data.unitCost;
  if (data.unitPrice) newObject.unitPrice = data.unitPrice;
  if (data.description) newObject.description = data.description;

  // Create a record
  const record = new Stock(newObject);

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
  return Stock.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.stockId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Stock.findById(recordId)
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
  const recordId = req.params.reviewId || "";
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
  if (!data.vendor) return fail(res, 422, "vendor id cannot be empty.");
  if (!ObjectId.isValid(data.vendor)) return fail(res, 422, "Invalid vendor Id");
  if (!data.product) return fail(res, 422, "stock product cannot be empty.");
  if (!data.orderNum) return fail(res, 422, "stock orderNum cannot be empty");
  if (!(["add", "destroy"].indexOf(data.kind) >= 0)) {
    return fail(res, 422, "kind of stock operation must be either of add, or destroy");
  }
  if (!data.page) return fail(res, 422, "slide page cannot be empty");
  if (!(["text", "image"].indexOf(data.page) >= 0)) {
    return fail(res, 422, "slide page must be either of product, brand, category or blog.");
  }
  if (!data.quantity) return fail(res, 422, "stock quantity cannot be empty");
  if (!data.available) return fail(res, 422, "stock available cannot be empty");
  if (!data.unitCost) return fail(res, 422, "stock unitCost must be of type Array");
  if (!data.unitPrice) return fail(res, 422, "stock unitPrice cannot be empty");
  if (!data.description) return fail(res, 422, "stock description cannot be empty");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.product) newObject.product = data.product;
  if (data.orderNum) newObject.orderNum = data.orderNum;
  if (data.quantity) newObject.quantity = data.quantity;
  if (data.available) newObject.available = data.available;
  if (data.unitCost) newObject.unitCost = data.unitCost;
  if (data.unitPrice) newObject.unitPrice = data.unitPrice;
  if (data.description) newObject.description = data.description;

  // Find record and update it with id
  return Stock.findByIdAndUpdate(recordId, newObject, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Delete a stock with the specified stockId in the request
exports.delete = (req, res) => {
  const recordId = req.params.stockId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Stock.findByIdAndRemove(recordId)
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
