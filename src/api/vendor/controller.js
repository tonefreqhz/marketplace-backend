
import Vendor, { ObjectId } from "./model";
import { success, fail, notFound } from "../../services/response/index";

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Vendor.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.vendorId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Vendor.findById(recordId)
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


// Find a single vendor with a vendorId
export function findVendorById(vendorId) {
  return Vendor
    .findById(vendorId)
    .then((vendor) => {
      if (!vendor) return false;
      return vendor;
    })
    .catch(err => err);
}

// Find a single vendor with a domainName
export function findVendorByDomain(domainName) {
  return Vendor
    .findOne({ domainName })
    .then((vendor) => {
      if (!vendor) return false;
      return vendor;
    })
    .catch(err => err);
}

// Update record identified by the Id in the request
export function update(req, res) {
  const recordId = req.params.vendorId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only Customers are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.email) return fail(res, 422, "email cannot be empty");

  const newObject = {};
  newObject.vendor = vendorId;
  if (data.fullname) newObject.fullname = data.fullname;
  if (data.phone) newObject.phone = data.phone;
  if (data.email) newObject.email = data.email;
  if (data.password) newObject.password = data.password;
  if (data.username) newObject.username = data.username;
  if (data.gender) newObject.gender = data.gender;
  if (data.wallet) newObject.wallet = data.wallet;
  if (data.businessName) newObject.businessName = data.businessName;
  if (data.domainName) newObject.domainName = data.domainName;
  if (data.recoveryCode) newObject.recoveryCode = data.recoveryCode;

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

  newObject.preferences = {};
  if (data.preferences.currency) newObject.preferences.currency = data.preferences.currency;
  if (data.preferences.language) newObject.preferences.language = data.preferences.language;

  newObject.address = {};
  if (data.address.country) newObject.address.country = data.address.country;
  if (data.address.state) newObject.address.state = data.address.state;
  if (data.address.city) newObject.address.city = data.address.city;
  if (data.address.street) newObject.address.street = data.address.street;
  if (data.address.building) newObject.address.building = data.address.building;
  if (data.address.zip) newObject.address.zip = data.address.zip;


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
  // Create a record
  const record = new Vendor(newObject);

  // Find record and update it with id
  return Vendor.findByIdAndUpdate(recordId, { record }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}

// Delete a vendor with the specified vendorId in the request
exports.delete = (req, res) => {
  const recordId = req.params.vendorId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Vendor.findByIdAndRemove(recordId)
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
