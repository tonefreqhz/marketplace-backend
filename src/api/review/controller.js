
import Review, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";


// Create and Save a new record
export function create(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let customerId;

  if (userType === "customer") {
    customerId = userId;
  } else {
    return fail(res, 422, `Only customers are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.vendor) return fail(res, 422, "vendor id cannot be empty.");
  if (!ObjectId.isValid(data.vendor)) return fail(res, 422, "Invalid vendor Id");
  if (!data.subject) return fail(res, 422, "subject cannot be empty");
  if (!(["product", "category", "brand", "vendor", "stock", "order"].indexOf(data.subject) >= 0)) {
    return fail(res, 422, "subject must be either of product, category, brand, vendor, stock, or order");
  }
  if (!data.subjectId) return fail(res, 422, "subjectId cannot be empty");
  if (!ObjectId.isValid(data.subjectId)) return fail(res, 422, "Invalid subject Id");
  if (!data.rating) return fail(res, 422, "rating cannot be empty");
  if (!(Number(data.rating) > 0 && Number(data.rating) < 6)) return fail(res, 422, "rating must be between [1 and 5].");

  const newObject = {};
  newObject.customer = customerId;
  if (!data.vendor) newObject.vendor = data.vendor;
  if (!data.subject) newObject.subject = data.subject;
  if (!data.subjectId) newObject.subjectId = data.subjectId;
  if (!data.comment) newObject.comment = data.comment;
  if (!data.rating) newObject.rating = data.rating;

  // Create a record
  const record = new Review(newObject);

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
  return Review.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.reviewId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Review.findById(recordId)
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
  let customerId;

  if (userType === "customer") {
    customerId = userId;
  } else {
    return fail(res, 422, `Only customers are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.vendor) return fail(res, 422, "vendor id cannot be empty.");
  if (!ObjectId.isValid(data.vendor)) return fail(res, 422, "Invalid vendor Id");
  if (!data.subject) return fail(res, 422, "subject cannot be empty");
  if (!(["product", "category", "brand", "vendor", "stock", "order"].indexOf(data.subject) >= 0)) {
    return fail(res, 422, "subject must be either of product, category, brand, vendor, stock, or order");
  }
  if (!data.subjectId) return fail(res, 422, "subjectId cannot be empty");
  if (!ObjectId.isValid(data.subjectId)) return fail(res, 422, "Invalid subject Id");
  if (!data.rating) return fail(res, 422, "rating cannot be empty");
  if (!(Number(data.rating) > 0 && Number(data.rating) < 6)) return fail(res, 422, "rating must be between [1 and 5].");

  const newObject = {};
  newObject.customer = customerId;
  if (!data.vendor) newObject.vendor = data.vendor;
  if (!data.subject) newObject.subject = data.subject;
  if (!data.subjectId) newObject.subjectId = data.subjectId;
  if (!data.comment) newObject.comment = data.comment;
  if (!data.rating) newObject.rating = data.rating;

  // Find record and update it with id
  return Review.findByIdAndUpdate(recordId, newObject, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}


// Delete a review with the specified reviewId in the request
exports.delete = (req, res) => {
  const recordId = req.params.reviewId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Review.findByIdAndRemove(recordId)
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
