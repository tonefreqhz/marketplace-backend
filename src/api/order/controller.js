
import Order, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";


// Create and Save a new record
export function create(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.title) return fail(res, 422, "title cannot be empty but either digital, physical.");
  if (!data.customer) return fail(res, 422, "customer cannot be empty and must be alphanumeric.");
  if (!data.products) return fail(res, 422, "order status cannot be empty and must be in pending, paid, delivered, closed");
  if (!data.shipmentDetails) return fail(res, 422, "shipment details cannot be empty and must array.");
  if (!data.trackingDetails) return fail(res, 422, "tracking details cannot be empty and must array.");
  if (!data.orderStatus) return fail(res, 422, "order status cannot be empty and must be pending, paid, delivered, closed.");

  const newObject = {};
  newObject.vendor = vendorId;
  if (!data.orderNum) newObject.orderNum = data.orderNum;
  if (!data.kind) newObject.kind = data.kind;
  if (!data.customer) newObject.customer = data.customer;
  if (!data.coupon) newObject.coupon = data.coupon;

  if (data.products && typeof data.products === "object" && data.products[0].product &&
  data.products[0].quantity) {
    let productField;
    let quantityField;
    let skuField;
    let nameField;
    let unitCostField;
    let currencyField;
    let vatField;
    const fieldArray = [];
    data.specArray.forEach((item, index, array) => {
      if (typeof item === "object" && item.name && item.value) {
        productField = data.products[index].product;
        quantityField = data.products[index].quantity;
        skuField = data.products[index].sku;
        nameField = data.products[index].name;
        unitCostField = data.products[index].unitCost;
        currencyField = data.products[index].currency;
        vatField = data.products[index].vat;
        fieldArray.push({
          product: productField,
          quantity: quantityField,
          sku: skuField,
          name: nameField,
          unitCost: unitCostField,
          currency: currencyField,
          vat: vatField,
        });
      }
    });
    newObject.specArray = {};
    newObject.specArray = fieldArray;
  }

  newObject.shipmentDetails = {};
  if (!data.shipmentDetails.recipient) {
    newObject.shipmentDetails.recipient = data.shipmentDetails.recipient;
  }
  if (!data.shipmentDetails.country) {
    newObject.shipmentDetails.country = data.shipmentDetails.country;
  }
  if (!data.shipmentDetails.state) {
    newObject.shipmentDetails.state = data.shipmentDetails.state;
  }
  if (!data.shipmentDetails.city) {
    newObject.shipmentDetails.city = data.shipmentDetails.city;
  }
  if (!data.shipmentDetails.street) {
    newObject.shipmentDetails.street = data.shipmentDetails.street;
  }
  if (!data.shipmentDetails.building) {
    newObject.shipmentDetails.building = data.shipmentDetails.building;
  }
  if (!data.shipmentDetails.zip) {
    newObject.shipmentDetails.zip = data.shipmentDetails.zip;
  }
  if (!data.shipmentDetails.phone) {
    newObject.shipmentDetails.phone = data.shipmentDetails.phone;
  }
  if (!data.shipmentDetails.email) {
    newObject.shipmentDetails.email = data.shipmentDetails.email;
  }
  if (!data.shipmentDetails.deliveryNote) {
    newObject.shipmentDetails.deliveryNote = data.shipmentDetails.deliveryNote;
  }

  newObject.trackingDetails = {};
  if (!data.trackingDetails.company) {
    newObject.trackingDetails.company = data.trackingDetails.company;
  }
  if (!data.trackingDetails.code) {
    newObject.trackingDetails.code = data.trackingDetails.code;
  }
  if (!data.trackingDetails.standing) {
    newObject.trackingDetails.standing = data.trackingDetails.standing;
  }
  if (!data.trackingDetails.estimatedDelivery) {
    newObject.trackingDetails.estimatedDelivery = data.trackingDetails.estimatedDelivery;
  }

  if (!data.orderStatus) newObject.orderStatus = data.orderStatus;

  // Create a record
  const record = new Order(newObject);

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
  return Order.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.orderId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Order.findById(recordId)
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
  const recordId = req.params.couponId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to update this record not ${userType}`);
  }

  // Validate request
  if (!data.title) return fail(res, 422, "title cannot be empty but either digital, physical.");
  if (!data.customer) return fail(res, 422, "customer cannot be empty and must be alphanumeric.");
  if (!data.products) return fail(res, 422, "order status cannot be empty and must be in pending, paid, delivered, closed");
  if (!data.shipmentDetails) return fail(res, 422, "shipment details cannot be empty and must array.");
  if (!data.trackingDetails) return fail(res, 422, "tracking details cannot be empty and must array.");
  if (!data.orderStatus) return fail(res, 422, "order status cannot be empty and must be pending, paid, delivered, closed.");

  const newObject = {};
  newObject.vendor = vendorId;
  if (!data.orderNum) newObject.orderNum = data.orderNum;
  if (!data.kind) newObject.kind = data.kind;
  if (!data.customer) newObject.customer = data.customer;
  if (!data.coupon) newObject.coupon = data.coupon;

  if (data.products && typeof data.products === "object" && data.products[0].product &&
  data.products[0].quantity) {
    let productField;
    let quantityField;
    let skuField;
    let nameField;
    let unitCostField;
    let currencyField;
    let vatField;
    const fieldArray = [];
    data.specArray.forEach((item, index, array) => {
      if (typeof item === "object" && item.name && item.value) {
        productField = data.products[index].product;
        quantityField = data.products[index].quantity;
        skuField = data.products[index].sku;
        nameField = data.products[index].name;
        unitCostField = data.products[index].unitCost;
        currencyField = data.products[index].currency;
        vatField = data.products[index].vat;
        fieldArray.push({
          product: productField,
          quantity: quantityField,
          sku: skuField,
          name: nameField,
          unitCost: unitCostField,
          currency: currencyField,
          vat: vatField,
        });
      }
    });
    newObject.specArray = {};
    newObject.specArray = fieldArray;
  }

  newObject.shipmentDetails = {};
  if (!data.shipmentDetails.recipient) {
    newObject.shipmentDetails.recipient = data.shipmentDetails.recipient;
  }
  if (!data.shipmentDetails.country) {
    newObject.shipmentDetails.country = data.shipmentDetails.country;
  }
  if (!data.shipmentDetails.state) {
    newObject.shipmentDetails.state = data.shipmentDetails.state;
  }
  if (!data.shipmentDetails.city) {
    newObject.shipmentDetails.city = data.shipmentDetails.city;
  }
  if (!data.shipmentDetails.street) {
    newObject.shipmentDetails.street = data.shipmentDetails.street;
  }
  if (!data.shipmentDetails.building) {
    newObject.shipmentDetails.building = data.shipmentDetails.building;
  }
  if (!data.shipmentDetails.zip) {
    newObject.shipmentDetails.zip = data.shipmentDetails.zip;
  }
  if (!data.shipmentDetails.phone) {
    newObject.shipmentDetails.phone = data.shipmentDetails.phone;
  }
  if (!data.shipmentDetails.email) {
    newObject.shipmentDetails.email = data.shipmentDetails.email;
  }
  if (!data.shipmentDetails.deliveryNote) {
    newObject.shipmentDetails.deliveryNote = data.shipmentDetails.deliveryNote;
  }

  newObject.trackingDetails = {};
  if (!data.trackingDetails.company) {
    newObject.trackingDetails.company = data.trackingDetails.company;
  }
  if (!data.trackingDetails.code) {
    newObject.trackingDetails.code = data.trackingDetails.code;
  }
  if (!data.trackingDetails.standing) {
    newObject.trackingDetails.standing = data.trackingDetails.standing;
  }
  if (!data.trackingDetails.estimatedDelivery) {
    newObject.trackingDetails.estimatedDelivery = data.trackingDetails.estimatedDelivery;
  }

  if (!data.orderStatus) newObject.orderStatus = data.orderStatus;

  // Find record and update it with id
  return Order.findByIdAndUpdate(recordId, { newObject }, { new: true })
    .then((result) => {
      if (!result) return notFound(res, `Error: newly submitted record not found with id ${recordId}`);
      return success(res, 200, result, "New record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error updating record with id ${recordId}.\r\n${err.message}`));
}


// Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
  const recordId = req.params.orderId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Order.findByIdAndRemove(recordId)
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
