
import Transaction, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";


// Create and Save a new record
export function create(req, res) {
  const { userId, userType } = res.locals;
  let customerId;

  if (userType === "customer") {
    customerId = userId;
  } else {
    return fail(res, 422, `Only customers are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!customerId) return fail(res, 400, "No customer Id as request parameter");
  if (!ObjectId.isValid(customerId)) return fail(res, 422, "Invalid customer Id as request parameter");

  // Create a record
  const record = new Transaction({ customer: customerId });

  // Save Product in the database
  return record.save()
    .then((result) => {
      if (!result) return notFound(res, "Error: newly submitted record not found");
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error creating record.\r\n${err.message}`));
}


// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Transaction.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.transactionId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Transaction.findById(recordId)
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
