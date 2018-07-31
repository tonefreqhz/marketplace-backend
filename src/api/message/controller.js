
import Message, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new record
export function create(req, res) {
  const data = req.body || {};
  let { userId, userType } = res.locals;
  const newObject = {};

  switch (userType) {
    case "admin": newObject.admin = userId; newObject.sentBy = "admin"; break;
    case "vendor": newObject.vendor = userId; newObject.sentBy = "vendor"; break;
    case "customer": newObject.customer = userId; newObject.sentBy = "customer"; break;
    default: newObject.sentBy = "visitor";
      userType = "visitor";
      userId = "123456789100";
      if (!data.visitorName) return fail(res, 422, "visitor name cannot be empty. Please login if you have an account");
      if (!data.visitorEmail) return fail(res, 422, "visitor email cannot be empty. Please login if you have an account");
  }
  // Validate request
  if (!data.kind) return fail(res, 422, 'kind cannot be empty either "arbitration", "chat", "contact", "ticket"');
  if (!data.messageSession) return fail(res, 422, "messageSession cannot be empty.");
  if (!data.messageBetween) return fail(res, 422, '"visitor_vendor", "customer_vendor", "customer_admin", "vendor_admin"');
  if (!data.subject) return fail(res, 422, "subject cannot be empty.");
  if (!data.message) return fail(res, 422, "message cannot be empty.");


  if (data.kind) newObject.kind = data.kind;
  if (data.messageSession) newObject.messageSession = data.messageSession;
  if (data.messageBetween) newObject.messageBetween = data.messageBetween;
  if (data.visitorName) newObject.visitorName = data.visitorName;
  if (data.visitorEmail) newObject.visitorEmail = data.visitorEmail;
  if (data.subject) newObject.subject = data.subject;
  if (data.message) newObject.message = data.message;

  // Create a record
  const record = new Message(newObject);

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
  return Message.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.messageId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Message.findById(recordId)
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

// Update record identified by the Id in the request
export function update(req, res) {
  const recordId = req.params.mailId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  let { userId, userType } = res.locals;
  const newObject = {};

  switch (userType) {
    case "admin": newObject.admin = userId; newObject.sentBy = "admin"; break;
    case "vendor": newObject.vendor = userId; newObject.sentBy = "vendor"; break;
    case "customer": newObject.customer = userId; newObject.sentBy = "customer"; break;
    default: newObject.sentBy = "visitor";
      userType = "visitor";
      userId = "123456789100";
      if (!data.visitorName) return fail(res, 422, "visitor name cannot be empty. Please login if you have an account");
      if (!data.visitorEmail) return fail(res, 422, "visitor email cannot be empty. Please login if you have an account");
  }
  // Validate request
  if (!data.kind) return fail(res, 422, 'kind cannot be empty either "arbitration", "chat", "contact", "ticket"');
  if (!data.messageSession) return fail(res, 422, "messageSession cannot be empty.");
  if (!data.messageBetween) return fail(res, 422, '"visitor_vendor", "customer_vendor", "customer_admin", "vendor_admin"');
  if (!data.subject) return fail(res, 422, "subject cannot be empty.");
  if (!data.message) return fail(res, 422, "message cannot be empty.");


  if (data.kind) newObject.kind = data.kind;
  if (data.messageSession) newObject.messageSession = data.messageSession;
  if (data.messageBetween) newObject.messageBetween = data.messageBetween;
  if (data.visitorName) newObject.visitorName = data.visitorName;
  if (data.visitorEmail) newObject.visitorEmail = data.visitorEmail;
  if (data.subject) newObject.subject = data.subject;
  if (data.message) newObject.message = data.message;


  // Find record and update it with id
  return Message.findByIdAndUpdate(recordId, { ...newObject }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}


// Delete a message with the specified messageId in the request
exports.delete = (req, res) => {
  const recordId = req.params.messageId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Message.findByIdAndRemove(recordId)
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
