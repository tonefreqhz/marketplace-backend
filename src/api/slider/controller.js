
import Slider, { ObjectId } from "./model";
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
  if (!data.name) return fail(res, 422, "slide name cannot be empty.");
  if (!data.kind) return fail(res, 422, "slide type cannot be empty");
  if (!(["text", "image"].indexOf(data.kind) >= 0)) {
    return fail(res, 422, "slide type must be either of image or text.");
  }
  if (!data.page) return fail(res, 422, "slide page cannot be empty");
  if (!(["text", "image"].indexOf(data.page) >= 0)) {
    return fail(res, 422, "slide page must be either of product, brand, category or blog.");
  }
  if (!data.place) return fail(res, 422, "slide position cannot be empty");
  if (!data.elements) return fail(res, 422, "slide elements cannot be empty");
  if (!data.elements.isArray) return fail(res, 422, "slide elements must be of type Array");

  const newObject = {};
  newObject.vendor = vendorId;
  if (!data.name) newObject.name = data.name;
  if (!data.kind) newObject.kind = data.kind;
  if (!data.page) newObject.page = data.page;
  if (!data.place) newObject.place = data.place;
  if (!data.elements) newObject.elements = data.elements;
  if (!data.style) newObject.style = data.style;

  // Create a record
  const record = new Slider(newObject);

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
  return Slider.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.sliderId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Slider.findById(recordId)
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
  if (!data.name) return fail(res, 422, "slide name cannot be empty.");
  if (!data.kind) return fail(res, 422, "slide type cannot be empty");
  if (!(["text", "image"].indexOf(data.kind) >= 0)) {
    return fail(res, 422, "slide type must be either of image or text.");
  }
  if (!data.page) return fail(res, 422, "slide page cannot be empty");
  if (!(["text", "image"].indexOf(data.page) >= 0)) {
    return fail(res, 422, "slide page must be either of product, brand, category or blog.");
  }
  if (!data.place) return fail(res, 422, "slide position cannot be empty");
  if (!data.elements) return fail(res, 422, "slide elements cannot be empty");
  if (!data.elements.isArray) return fail(res, 422, "slide elements must be of type Array");

  const newObject = {};
  newObject.vendor = vendorId;
  if (!data.name) newObject.name = data.name;
  if (!data.kind) newObject.kind = data.kind;
  if (!data.page) newObject.page = data.page;
  if (!data.place) newObject.place = data.place;
  if (!data.elements) newObject.elements = data.elements;
  if (!data.style) newObject.style = data.style;

  // Find record and update it with id
  return Slider.findByIdAndUpdate(recordId, newObject, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}


// Delete a slider with the specified sliderId in the request
exports.delete = (req, res) => {
  const recordId = req.params.sliderId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Slider.findByIdAndRemove(recordId)
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
