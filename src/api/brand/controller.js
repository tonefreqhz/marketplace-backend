
import Brand from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Brand
exports.create = (req, res) => {
  // Validate request
  if (!req.body.decription) {
    res.status(400).send({
      message: "Brand description can not be empty",
    });
  }

  // Create a Brand
  const brand = new Brand({
    name: req.body.name || "Untitled Brand",
    description: req.body.description,
  });

  // Save Brand in the database
  brand.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Brand.",
      });
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
  if (!req.body.decription) {
    res.status(400).send({
      message: "Brand description can not be empty",
    });
  }

  // Find brand and update it with the request body
  Brand.findByIdAndUpdate(req.params.brandId, {
    name: req.body.name || "Untitled Brand",
    description: req.body.description,
  }, { new: true })
    .then((brand) => {
      if (!brand) {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.send(brand);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Brand not found with id ${req.params.brandId}`,
        });
      }
      res.status(500).send({
        message: `Error updating brand with id ${req.params.brandId}`,
      });
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
