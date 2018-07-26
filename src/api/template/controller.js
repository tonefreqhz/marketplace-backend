
import Template from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Template
exports.create = (req, res) => {
  // Validate request
  if (!req.body.page) {
    res.status(400).send({
      message: "Template page can not be empty",
    });
  }

  // Create a Template
  const template = new Template({
    name: req.body.name,
    page: req.body.page,
    icon: req.body.icon,
    style: req.body.style,
  });

  // Save Template in the database
  template.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Template.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Template.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.templateId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Template.findById(req.params.recordId)
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

// Update a template identified by the templateId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.page) {
    res.status(400).send({
      message: "Template page can not be empty",
    });
  }

  // Find template and update it with the request body
  Template.findByIdAndUpdate(req.params.templateId, {
    name: req.body.name,
    page: req.body.page,
    icon: req.body.icon,
    style: req.body.style,
  }, { new: true })
    .then((template) => {
      if (!template) {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.send(template);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Template not found with id ${req.params.templateId}`,
        });
      }
      res.status(500).send({
        message: `Error updating template with id ${req.params.templateId}`,
      });
    });
};

// Delete a template with the specified templateId in the request
exports.delete = (req, res) => {
  const recordId = req.params.templateId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Template.findByIdAndRemove(recordId)
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
