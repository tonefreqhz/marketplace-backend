
import Setting from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Setting
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kind) {
    res.status(400).send({
      message: "Setting kind can not be empty",
    });
  }

  // Create a Setting
  const setting = new Setting({
    code: req.body.code,
    kind: req.body.kind,
    name: req.body.name,
    value: req.body.value,
    description: req.body.description,
  });

  // Save Setting in the database
  setting.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Setting.",
      });
    });
};


// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Setting.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.settingId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Setting.findById(req.params.recordId)
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

// Update a setting identified by the settingId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Setting content can not be empty",
    });
  }

  // Find setting and update it with the request body
  Setting.findByIdAndUpdate(req.params.settingId, {
    title: req.body.title || "Untitled Setting",
    content: req.body.content,
  }, { new: true })
    .then((setting) => {
      if (!setting) {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.send(setting);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Setting not found with id ${req.params.settingId}`,
        });
      }
      res.status(500).send({
        message: `Error updating setting with id ${req.params.settingId}`,
      });
    });
};

// Delete a setting with the specified settingId in the request
exports.delete = (req, res) => {
  const recordId = req.params.settingId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Setting.findByIdAndRemove(recordId)
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
