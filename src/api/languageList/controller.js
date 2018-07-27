
import LanguageList, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new LanguageList
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "LanguageList name can not be empty",
    });
  }

  // Create a LanguageList
  const languageList = new LanguageList({
    name: req.body.name || "Untitled LanguageList",
    dbField: req.body.dbField,
  });

  // Save LanguageList in the database
  languageList.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the LanguageList.",
      });
    });
};

// Retrieve and return all languageLists from the database.
exports.findAll = (req, res) => {
  LanguageList.find()
    .then((languageLists) => {
      res.send(languageLists);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving languageLists.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return LanguageList.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.languageListId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return LanguageList.findById(recordId)
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

// Update a languageList identified by the languageListId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "LanguageList name can not be empty",
    });
  }

  // Find languageList and update it with the request body
  LanguageList.findByIdAndUpdate(req.params.languageListId, {
    name: req.body.name || "Untitled LanguageList",
    dbField: req.body.dbField,
  }, { new: true })
    .then((languageList) => {
      if (!languageList) {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.send(languageList);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `LanguageList not found with id ${req.params.languageListId}`,
        });
      }
      res.status(500).send({
        message: `Error updating languageList with id ${req.params.languageListId}`,
      });
    });
};

// Delete a languageList with the specified languageListId in the request
exports.delete = (req, res) => {
  const recordId = req.params.languageListId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return LanguageList.findByIdAndRemove(recordId)
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
