
import Brand from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Brand
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    return fail(res, 400, "Brand description can not be empty");
  }

  // Create a Brand
  const brand = new Brand({
    name: req.body.name || "Untitled Brand",
    description: req.body.description,
    vendor: res.locals.id
  });

  // Save Brand in the database
  brand.save()
    .then((data) => {
      return success(res, 200, data, "You have successfully created Product Brand");
    }).catch((err) => {
      return fail(res, 500, err.message);
    });
};


// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Brand.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.brandId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Brand.findById(req.params.recordId)
    .then((result) => {
      if (!result) return notFound(res, 404, "Error record not found.");
      return success(res, 200, result, "retrieving record was successfully!");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, 404, `Error retrieving record.\r\n${err.message}`);
      }
      return fail(res, 500, `Error retrieving record.\r\n${err.message}`);
    });
}

// Update a brand identified by the brandId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.description) {
    return fail(res, 400, "Brand description can not be empty")
  }

  // Find brand and update it with the request body
  Brand.findByIdAndUpdate(req.params.brandId, {
    name: req.body.name || "Untitled Brand",
    description: req.body.description,
  }, { new: true })
    .then((brand) => {
      if (!brand) {
        notFound(res, "Product Brand not found");
      }
      success(res, 200, brand.view(true), "You have successfully updated product brands");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, "Product Brand not found");
      }
      notFound(res, 500, "Error updating the Product Brand");
    });
};

// Delete a brand with the specified brandId in the request
exports.delete = (req, res) => {
  const recordId = req.params.brandId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Brand.findByIdAndRemove(recordId)
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
