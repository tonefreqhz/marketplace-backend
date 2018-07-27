
import Order from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.order_num) {
    res.status(400).send({
      message: "Order number can not be empty",
    });
  }

  // Create a Order
  const order = new Order({
    order_num: req.body.order_num,
    kind: req.body.kind,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    product_array: req.body.product_array,
    payment_array: req.body.payment_array,
    shipment_array: req.body.shipment_array,
    delivery_array: req.body.delivery_array,
    tracking_num: req.body.tracking_num,
    vat: req.body.vat,
    payable: req.body.payable,
    coupon_id: req.body.coupon_id,
    order_status: req.body.order_status,
    fullname: req.body.fullname,
    zip: req.body.zip,
    address: req.body.address,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
  });

  // Save Order in the database
  order.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Order.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.orderId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Order.findById(req.params.recordId)
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

// Update a order identified by the orderId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.order_num) {
    res.status(400).send({
      message: "Order number can not be empty",
    });
  }

  // Find order and update it with the request body
  Order.findByIdAndUpdate(req.params.orderId, {
    order_num: req.body.order_num,
    kind: req.body.kind,
    customer_id: req.body.customer_id,
    vendor_id: req.body.vendor_id,
    product_array: req.body.product_array,
    payment_array: req.body.payment_array,
    shipment_array: req.body.shipment_array,
    delivery_array: req.body.delivery_array,
    tracking_num: req.body.tracking_num,
    vat: req.body.vat,
    payable: req.body.payable,
    coupon_id: req.body.coupon_id,
    order_status: req.body.order_status,
    fullname: req.body.fullname,
    zip: req.body.zip,
    address: req.body.address,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    phone: req.body.phone,
    email: req.body.email,
  }, { new: true })
    .then((order) => {
      if (!order) {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.send(order);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Order not found with id ${req.params.orderId}`,
        });
      }
      res.status(500).send({
        message: `Error updating order with id ${req.params.orderId}`,
      });
    });
};

// Delete a order with the specified orderId in the request
exports.delete = (req, res) => {
  const recordId = req.params.orderId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
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
