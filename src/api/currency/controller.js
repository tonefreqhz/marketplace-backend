
import Currency from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Currency
exports.create = (req, res) => {
  // Validate request
  if (!req.body.code) {
    res.status(400).send({
      message: "Currency code can not be empty",
    });
  }

  // Create a Currency
  const currency = new Currency({
    name: req.body.name || "Untitled Currency",
    code: req.body.code,
    description: req.body.description,
    kind: req.body.kind,
    symbol: req.body.symbol,
    exchange: req.body.exchange,
    view_count: req.body.view_count,
  });

  // Save Currency in the database
  currency.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Currency.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Currency.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.currencyId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Currency.findById(req.params.recordId)
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

// Find a single currency with a currencyId
exports.findOne = (req, res) => {
  // Get currency by currencyId
  Currency.findById(req.params.currencyId)
    .then((currency) => {
      if (!currency) {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.send(currency);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving currency with id ${req.params.currencyId}`,
      });
    });
};

// Update a currency identified by the currencyId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.code) {
    res.status(400).send({
      message: "Currency code can not be empty",
    });
  }

  // Find currency and update it with the request body
  Currency.findByIdAndUpdate(req.params.currencyId, {
    name: req.body.name || "Untitled Currency",
    code: req.body.code,
    description: req.body.description,
    kind: req.body.kind,
    symbol: req.body.symbol,
    exchange: req.body.exchange,
    view_count: req.body.view_count,
  }, { new: true })
    .then((currency) => {
      if (!currency) {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.send(currency);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Currency not found with id ${req.params.currencyId}`,
        });
      }
      res.status(500).send({
        message: `Error updating currency with id ${req.params.currencyId}`,
      });
    });
};

// Delete a currency with the specified currencyId in the request
exports.delete = (req, res) => {
  const recordId = req.params.currencyId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Currency.findByIdAndRemove(recordId)
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
