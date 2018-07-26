
import Stock from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Stock
exports.create = (req, res) => {
  // Validate request
  if (!req.body.kind) {
    res.status(400).send({
      message: "Stock kind can not be empty",
    });
  }

  // Create a Stock
  const stock = new Stock({
    vendor_id: req.body.vendor_id,
    product_id: req.body.product_id,
    order_num: req.body.order_num,
    kind: req.body.kind,
    quantity: req.body.quantity,
    avaialable: req.body.avaialable,
    unit_cost: req.body.unit_cost,
    unit_price: req.body.unit_price,
    description: req.body.description,
  });

  // Save Stock in the database
  stock.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Stock.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Stock.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.stockId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Stock.findById(req.params.recordId)
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


// Update a stock identified by the stockId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Stock content can not be empty",
    });
  }

  // Find stock and update it with the request body
  Stock.findByIdAndUpdate(req.params.stockId, {
    title: req.body.title || "Untitled Stock",
    content: req.body.content,
  }, { new: true })
    .then((stock) => {
      if (!stock) {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.send(stock);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Stock not found with id ${req.params.stockId}`,
        });
      }
      res.status(500).send({
        message: `Error updating stock with id ${req.params.stockId}`,
      });
    });
};

// Delete a stock with the specified stockId in the request
exports.delete = (req, res) => {
  const recordId = req.params.stockId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Stock.findByIdAndRemove(recordId)
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
