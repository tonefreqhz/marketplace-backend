
import Customer, { ObjectId } from "./model";
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
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Customer.findById(recordId)
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
  const recordId = req.params.customerId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let customerId;

  if (userType === "customer") {
    customerId = userId;
  } else {
    return fail(res, 422, `Only Customers are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.username) return fail(res, 422, "username cannot be empty and must be alphanumeric.");
  if (!data.email) return fail(res, 422, "email cannot be empty");

  const newObject = {};
  newObject.customer = customerId;
  if (data.fullname) newObject.fullname = data.fullname;
  if (data.username) newObject.username = data.username;
  if (data.gender) newObject.gender = data.gender;
  if (data.phone) newObject.phone = data.phone;
  if (data.email) newObject.email = data.email;
  if (data.password) newObject.password = data.password;
  if (data.recoveryCode) newObject.recoveryCode = data.recoveryCode;
  if (data.wallet) newObject.wallet = data.wallet;

  if (data.wishlist && typeof data.wishlist === "object" && data.wishlist[0].names &&
  data.wishlist[0].carts && typeof (data.wishlist[0].carts) === "object") {
    let fieldName = "";
    let fieldCart = {};
    const fieldArray = [];
    data.wishlist.forEach((item, index, array) => {
      if (typeof item === "object" && item.name && item.cart) {
        fieldName = data.wishlist[index].name;
        fieldCart = data.wishlist[index].cart;
        fieldArray.push({ names: fieldName, carts: fieldCart });
      }
    });
    newObject.wishlist = {};
    newObject.wishlist = fieldArray;
  }

  if (data.cart && typeof data.cart === "object" && data.cart[0].product && data.cart[0].quantity) {
    let fieldProduct;
    let fieldQuantity;
    const fieldArray = [];
    data.cart.forEach((item, index, array) => {
      if (typeof item === "object" && item.product && item.quantity) {
        fieldProduct = data.cart[index].product;
        fieldQuantity = data.cart[index].quantity;
        fieldArray.push({ product: fieldProduct, quantity: fieldQuantity });
      }
    });
    newObject.cart = {};
    newObject.cart = fieldArray;
  }

  if ((data.preferences.currency) || (data.preferences.language)) {
    newObject.preferences = {};
    if (data.preferences.currency) newObject.preferences.currency = data.preferences.currency;
    if (data.preferences.language) newObject.preferences.language = data.preferences.language;
  }

  if ((data.shipping.zip) && (data.shipping.city) && (data.shipping.street)) {
    newObject.shipping = {};
    if (data.shipping.country) newObject.shipping.country = data.shipping.country;
    if (data.shipping.state) newObject.shipping.state = data.shipping.state;
    if (data.shipping.city) newObject.shipping.city = data.shipping.city;
    if (data.shipping.street) newObject.shipping.street = data.shipping.street;
    if (data.shipping.building) newObject.shipping.building = data.shipping.building;
    if (data.shipping.zip) newObject.shipping.zip = data.shipping.zip;
  }

  if (data.phone) newObject.phone = data.phone;
  if (data.email) newObject.email = data.email;


  if (data.notifications && typeof data.notifications === "object" && data.notifications[0].date &&
  data.notifications[0].notice && data.notifications[0].standing) {
    let fieldDate;
    let fieldNotice;
    let fieldStanding;
    const fieldArray = [];
    data.notifications.forEach((item, index, array) => {
      if (typeof item === "object" && item.date && item.notice && item.standing) {
        fieldDate = data.notifications[index].date;
        fieldNotice = data.notifications[index].notice;
        fieldStanding = data.notifications[index].standing;
        fieldArray.push({ date: fieldDate, notice: fieldNotice, standing: fieldStanding });
      }
    });
    newObject.notifications = {};
    newObject.notifications = fieldArray;
  }

  // Find record and update it with id
  return Customer.findByIdAndUpdate(recordId, { ...newObject }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
  const recordId = req.params.customerId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
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
