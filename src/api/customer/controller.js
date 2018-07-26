
import Customer from "./model";
import { success, fail, notFound } from "./../../services/response";


// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Customer.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.customerId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Customer.findById(req.params.recordId)
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

// Update a customer identified by the customerId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.publicAddress) {
    res.status(400).send({
      message: "Customer publicAddress can not be empty",
    });
  }

  // Find customer and update it with the request body
  Customer.findByIdAndUpdate(req.params.customerId, {
    publicAddress: req.body.publicAddress,
    username: req.body.username || "",
    language: req.body.language || "",
    currency_id: req.body.currency_id || "",
    cart: req.body.cart || "",
    gender: req.body.gender || "",
    password: req.body.password || "",
    photo: req.body.photo || "",
    profile: req.body.profile || "",
    fullname: req.body.fullname || "",
    address: req.body.address || "",
    city: req.body.city || "",
    zip: req.body.zip || "",
    state: req.body.state || "",
    country: req.body.country || "",
    phone: req.body.phone || "",
    email: req.body.email || "",
  }, { new: true })
    .then((customer) => {
      if (!customer) {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.send(customer);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Customer not found with id ${req.params.customerId}`,
        });
      }
      res.status(500).send({
        message: `Error updating customer with id ${req.params.customerId}`,
      });
    });
};

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
  const recordId = req.params.customerId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Customer.findByIdAndRemove(recordId)
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
