
import Language, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Language
exports.create = (req, res) => {
  // Validate request
  if (!req.body.word) {
    res.status(400).send({
      message: "Language word can not be empty",
    });
  }

  // Create a Language
  const language = new Language({
    word: req.body.word || "Empty Word",
    english: req.body.english,
    french: req.body.french,
    spanish: req.body.spanish,
    bangla: req.body.bangla,
    arabic: req.body.arabic,
    chinese: req.body.chinese,
  });

  // Save Language in the database
  language.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Language.",
      });
    });
};


// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Language.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.languageId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Language.findById(recordId)
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

// Update a language identified by the languageId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.word) {
    res.status(400).send({
      message: "Language word can not be empty",
    });
  }

  // Find language and update it with the request body
  Language.findByIdAndUpdate(req.params.languageId, {
    word: req.body.word || "Empty Word",
    english: req.body.english,
    french: req.body.french,
    spanish: req.body.spanish,
    bangla: req.body.bangla,
    arabic: req.body.arabic,
    chinese: req.body.chinese,
  }, { new: true })
    .then((language) => {
      if (!language) {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.send(language);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Language not found with id ${req.params.languageId}`,
        });
      }
      res.status(500).send({
        message: `Error updating language with id ${req.params.languageId}`,
      });
    });
};

// Delete a language with the specified languageId in the request
exports.delete = (req, res) => {
  const recordId = req.params.languageId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Language.findByIdAndRemove(recordId)
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
