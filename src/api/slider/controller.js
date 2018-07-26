
import Slider from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Slider
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Slider name can not be empty",
    });
  }

  // Create a Slider
  const slider = new Slider({
    name: req.body.name,
    vendor_id: req.body.vendor_id,
    kind: req.body.kind,
    elements: req.body.elements,
    place: req.body.place,
    title: req.body.title,
    style: req.body.style,
  });

  // Save Slider in the database
  slider.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Slider.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Slider.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.sliderId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Slider.findById(req.params.recordId)
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

// Update a slider identified by the sliderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Slider content can not be empty",
    });
  }

  // Find slider and update it with the request body
  Slider.findByIdAndUpdate(req.params.sliderId, {
    title: req.body.title || "Untitled Slider",
    content: req.body.content,
  }, { new: true })
    .then((slider) => {
      if (!slider) {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.send(slider);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Slider not found with id ${req.params.sliderId}`,
        });
      }
      res.status(500).send({
        message: `Error updating slider with id ${req.params.sliderId}`,
      });
    });
};

// Delete a slider with the specified sliderId in the request
exports.delete = (req, res) => {
  const recordId = req.params.sliderId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
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
