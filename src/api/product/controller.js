
import validator from "validator";
import Product from "./model";
import { findVendorByDomain } from "./../vendor/controller";
import { success, fail, notFound } from "../../services/response/index";


// Find a single product with a given product id
export function findProductById(id) {
  return Product
    .findById(id)
    .then((result) => {
      if (!result) return false;
      return result;
    })
    .catch(err => err);
}

// Find a single product with a given vendor id
export function findProductByVendor(vendor) {
  return Product
    .findOne({ vendor })
    .then((result) => {
      if (!result) return false;
      return result;
    })
    .catch(err => err);
}

// Create and Save a new Product
export function create(req, res) {
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to add products not ${userType}`);
  }

  // Validate request
  if (!vendorId) return fail(res, 422, "Product vendor can not be empty and must be alphanumeric.");

  if (!data.name) return fail(res, 422, "Product name can not be empty and must be alphanumeric.");

  if (!data.category.main) return fail(res, 422, "Product category can not be empty and must be alphanumeric.");

  if (!data.description.long) return fail(res, 422, "Product description can not be empty and must be alphanumeric.");

  if (!data.price.unit_price) return fail(res, 422, "Product unit price can not be empty and must be numeric.");

  const productObject = {};
  productObject.vendor = vendorId;
  if (data.code) productObject.code = data.code;
  if (data.sku) productObject.sku = data.sku;
  if (data.upc) productObject.upc = data.upc;
  if (data.name) productObject.name = data.name;
  if (data.brand) productObject.brand = data.brand;

  productObject.category = {};
  if (data.category && data.category.main) productObject.category.main = data.category.main;
  if (data.category && data.category.sub) productObject.category.sub = data.category.sub;
  if (data.brand) productObject.brand = data.brand;

  productObject.description = {};
  if (data.description.color) productObject.description.color = data.description.color;
  if (data.description.unit) productObject.description.unit = data.description.unit;
  if (data.description.long) productObject.description.long = data.description.long;
  if (data.description.short) productObject.description.short = data.description.short;
  if (data.description.tag && typeof data.description.tag === "object") {
    productObject.description.tag = [];
    productObject.description.tag = data.description.tag;
  }

  productObject.variety = {};
  if (data.variety.options && typeof data.variety.options === "boolean") {
    productObject.variety.options = data.variety.options;
    if (data.variety.parent) productObject.variety.parent = data.variety.parent;
  } else if (data.variety.options && (data.variety.options).toLowerCase() === "true") {
    productObject.variety.options = true;
    if (data.variety.parent) productObject.variety.parent = data.variety.parent;
  } else if (data.variety.options && (data.variety.options).toLowerCase() === "false") {
    productObject.variety.options = false;
    if (data.variety.parent) productObject.variety.parent = data.variety.parent;
  }

  if (data.variety.options === true && !data.variety.parent) {
    return fail(res, 422, "Enter variety parent name or set options to false.");
  }

  productObject.price = {};
  if (data.price.deal && typeof data.price.deal === "boolean") {
    productObject.price.deal = data.price.deal;
  } else if (data.price.deal && (data.price.deal).toLowerCase() === "true") {
    productObject.price.deal = true;
  } else if (data.price.deal && (data.price.deal).toLowerCase() === "false") {
    productObject.price.deal = false;
  }

  if (data.price.valuation && ((data.price.valuation).toUpperCase() === "LIFO" ||
  (data.price.valuation).toUpperCase() === "FIFO" || (data.price.valuation).toUpperCase() === "AVCO")) {
    productObject.price.valuation = (data.price.valuation).toUpperCase();
  }
  if (data.price.unit_price && typeof data.price.unit_price === "number") {
    productObject.price.unit_price = data.price.unit_price;
  }
  if (data.price.cost_price && typeof data.price.cost_price === "number") {
    productObject.price.cost_price = data.price.cost_price;
  }
  if (data.price.slash_price && typeof data.price.slash_price === "number") {
    productObject.price.slash_price = data.price.slash_price;
  }
  if (data.price.discount && typeof data.price.discount === "number") {
    productObject.price.discount = data.price.discount;
  }
  if (data.price.discount_type && ((data.price.discount_type).toLowerCase() === "fixed" ||
  (data.price.discount_type).toLowerCase() === "percent")) {
    productObject.price.discount_type = (data.price.discount_type).toLowerCase();
  }
  if (data.price.tax && typeof data.price.tax === "number") {
    productObject.price.tax = data.price.tax;
  }
  if (data.price.tax_type && ((data.price.tax_type).toLowerCase() === "fixed" ||
  (data.price.tax_type).toLowerCase() === "percent")) {
    productObject.price.tax_type = (data.price.tax_type).toLowerCase();
  }

  productObject.shipping_details = {};
  if (data.shipping_details.cost) productObject.shipping_details.cost = data.shipping_details.cost;
  if (data.shipping_details.weight) {
    productObject.shipping_details.weight = data.shipping_details.weight;
  }
  if (data.shipping_details.length) {
    productObject.shipping_details.length = data.shipping_details.length;
  }
  if (data.shipping_details.width) {
    productObject.shipping_details.width = data.shipping_details.width;
  }
  if (data.shipping_details.height) {
    productObject.shipping_details.height = data.shipping_details.height;
  }

  productObject.manufacture_details = {};
  if (data.manufacture_details.make) {
    productObject.manufacture_details.make = data.manufacture_details.make;
  }
  if (data.manufacture_details.model_number) {
    productObject.manufacture_details.model_number = data.manufacture_details.model_number;
  }
  if (data.manufacture_details.release_date) {
    productObject.manufacture_details.release_date = data.manufacture_details.release_date;
  }

  productObject.download = {};
  if (data.download.downloadable && typeof data.download.downloadable === "boolean") {
    productObject.download.downloadable = data.download.downloadable;
    if (data.download.name) productObject.download.name = data.download.name;
  } else if (data.download.downloadable && (data.download.downloadable).toLowerCase() === "true") {
    productObject.download.downloadable = true;
    if (data.download.name) productObject.download.name = data.download.name;
  } else if (data.download.downloadable && (data.download.downloadable).toLowerCase() === "false") {
    productObject.download.downloadable = false;
    if (data.download.name) productObject.download.name = data.download.name;
  }

  if (data.extra_fields && typeof data.extra_fields === "object" && data.extra_fields[0].name &&
   data.extra_fields[0].value) {
    let fieldName;
    let fieldValue;
    const fieldArray = [];
    data.extra_fields.forEach((item, index, array) => {
      if (typeof item === "object" && item.name && item.value) {
        fieldName = data.extra_fields[index].name;
        fieldValue = data.extra_fields[index].value;
        fieldArray.push({ name: fieldName, value: fieldValue });
      }
    });
    productObject.extra_fields = {};
    productObject.extra_fields = fieldArray;
  }

  // Create a Product
  const product = new Product(productObject);

  // Save Product in the database
  return product.save()
    .then((result) => {
      if (!result) {
        return fail(res, 404, "Error not found newly added product");
      }
      return success(res, 200, result, "New product record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error occurred while creating the Product.\r\n${err.message}`));
}

// Retrieve kinds of products vendor/:vendorDomain/products/kind/:kind?page=0&limit=50
// kind (optional) = [ deal | feature | popular | latest | normal ]
export async function findAll(req, res) {
  const { vendorDomain, kind } = req.params;
  // console.log("\r\n\r\nvendorDomain, kind ", vendorDomain, kind);
  if (!vendorDomain) return fail(res, 422, "Vendor shop has not been specified.");
  if (!kind) return fail(res, 422, "Product kind has not been specified.");

  let vendorId;

  const vendor = await findVendorByDomain(vendorDomain);

  if (vendor && vendor.id) vendorId = vendor.id;
  if (vendor && vendor._id) vendorId = vendor._id;

  // console.log("\r\n vendor", vendor);
  let page = req.query.page || 0;
  page = Math.max(0, page - 1); // using a zero-based page index for use with skip()
  let limit = req.query.limit || 10; // record size or counts/page to take
  if (Number(req.query.limit) > 10) limit = Number(req.query.limit);
  if (Number(req.query.limit) > 50) limit = 50; // cap on 50 records/page

  const offset = page * limit; // skip number of records

  const today = new Date(Date.now());
  // only docs from the past 30 days
  const dateFloor = (new Date()).setDate(today.getDate() - 30);

  let filter = {
    vendor: vendorId,
  };

  const filter1 = {
    vendor: vendorId,
    createdAt: { $gte: dateFloor },
  };

  const filter2 = {
    vendor: vendorId,
    "analytics.feature": true,
  };

  const filter3 = {
    vendor: vendorId,
    "analytics.deal": true,
  };

  let sort = { createdAt: -1 };

  switch (kind) {
    case "normal": sort = { createdAt: 1 };
      break;
    case "latest": filter = filter1; sort = { createdAt: -1 };
      break;
    case "popular": sort = { "analytics.view_count": 1 };
      break;
    case "feature": filter = filter2;
      break;
    case "deal": filter = filter3;
      break;
    default: sort = { createdAt: 1 };
  }

  const query = Product
    .find(filter)
    .limit(100)
    .sort(sort);

  return query.count((err, count) => {
    if (err) return fail(res, 500, `Error retrieving product(s).\r\n${err.message}`);
    return query.skip(offset).limit(limit).exec("find", (erro, result) => {
      if (erro) return fail(res, 500, `Error retrieving product(s).\r\n${erro.message}`);
      return success(res, 200, { count, result }, "product(s) retrieved successfully!");
    });
  });
}


// Retrieve multiple products "/products/operations/(:productIds)*"
export async function findSome(req, res) {
  const data = {};
  const productIds = (req.params.productIds).split("/");
  const products = await Promise.all(productIds.map((id, index) => findProductById(id)));
  products.forEach((product, index) => {
    if (product && product._id) {
      data[product._id] = product;
    }
  });

  const size = Object.keys(data).length;
  if (size > 0) return success(res, 200, data, `${size} results retrieved successfully!`);
  return notFound(res, "Error: product(s) not found");
}

// Find a single product with a productId
export function findOne(req, res) {
  const productId = req.params.productId || "";

  // Validate request
  if (!productId) return fail(res, 400, "Invalid Product Id as request parameter");

  return Product.findById(productId)
    .then((result) => {
      if (!result) {
        return fail(res, 404, `Error: product not found with id ${productId}`);
      }
      return success(res, 200, result, "product(s) retrieved successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Error: product not found with id ${productId}.\r\n ${err.message}`);
      }
      return fail(res, 500, `Error retrieving product with id ${productId}.\r\n ${err.message}`);
    });
}


// Update a product identified by the productId in the request
export function update(req, res) {
  const productId = req.params.productId || "";
  const data = req.body || {};
  const { userId, userType } = res.locals;
  let vendorId;

  if (userType === "vendor") {
    vendorId = userId;
  } else {
    return fail(res, 422, `Only vendors are allowed to add products not ${userType}`);
  }

  // Validate request
  if (!vendorId) return fail(res, 422, "Product vendor can not be empty and must be alphanumeric.");

  if (!data.name) return fail(res, 422, "Product name can not be empty and must be alphanumeric.");

  if (!data.category.main) return fail(res, 422, "Product category can not be empty and must be alphanumeric.");

  if (!data.description.long) return fail(res, 422, "Product description can not be empty and must be alphanumeric.");

  if (!data.price.unit_price) return fail(res, 422, "Product unit price can not be empty and must be numeric.");

  const productObject = {};
  productObject.vendor = vendorId;
  if (data.code) productObject.code = data.code;
  if (data.sku) productObject.sku = data.sku;
  if (data.upc) productObject.upc = data.upc;
  if (data.name) productObject.name = data.name;
  if (data.brand) productObject.brand = data.brand;

  productObject.category = {};
  if (data.category && data.category.main) productObject.category.main = data.category.main;
  if (data.category && data.category.sub) productObject.category.sub = data.category.sub;
  if (data.brand) productObject.brand = data.brand;

  productObject.description = {};
  if (data.description.color) productObject.description.color = data.description.color;
  if (data.description.unit) productObject.description.unit = data.description.unit;
  if (data.description.long) productObject.description.long = data.description.long;
  if (data.description.short) productObject.description.short = data.description.short;
  if (data.description.tag && typeof data.description.tag === "object") {
    productObject.description.tag = [];
    productObject.description.tag = data.description.tag;
  }

  productObject.variety = {};
  if (data.variety.options && typeof data.variety.options === "boolean") {
    productObject.variety.options = data.variety.options;
    if (data.variety.parent) productObject.variety.parent = data.variety.parent;
  } else if (data.variety.options && (data.variety.options).toLowerCase() === "true") {
    productObject.variety.options = true;
    if (data.variety.parent) productObject.variety.parent = data.variety.parent;
  } else if (data.variety.options && (data.variety.options).toLowerCase() === "false") {
    productObject.variety.options = false;
    if (data.variety.parent) productObject.variety.parent = data.variety.parent;
  }

  if (data.variety.options === true && !data.variety.parent) {
    return fail(res, 422, "Enter variety parent name or set options to false.");
  }

  productObject.price = {};
  if (data.price.deal && typeof data.price.deal === "boolean") {
    productObject.price.deal = data.price.deal;
  } else if (data.price.deal && (data.price.deal).toLowerCase() === "true") {
    productObject.price.deal = true;
  } else if (data.price.deal && (data.price.deal).toLowerCase() === "false") {
    productObject.price.deal = false;
  }

  if (data.price.valuation && ((data.price.valuation).toUpperCase() === "LIFO" ||
  (data.price.valuation).toUpperCase() === "FIFO" || (data.price.valuation).toUpperCase() === "AVCO")) {
    productObject.price.valuation = (data.price.valuation).toUpperCase();
  }
  if (data.price.unit_price && typeof data.price.unit_price === "number") {
    productObject.price.unit_price = data.price.unit_price;
  }
  if (data.price.cost_price && typeof data.price.cost_price === "number") {
    productObject.price.cost_price = data.price.cost_price;
  }
  if (data.price.slash_price && typeof data.price.slash_price === "number") {
    productObject.price.slash_price = data.price.slash_price;
  }
  if (data.price.discount && typeof data.price.discount === "number") {
    productObject.price.discount = data.price.discount;
  }
  if (data.price.discount_type && ((data.price.discount_type).toLowerCase() === "fixed" ||
  (data.price.discount_type).toLowerCase() === "percent")) {
    productObject.price.discount_type = (data.price.discount_type).toLowerCase();
  }
  if (data.price.tax && typeof data.price.tax === "number") {
    productObject.price.tax = data.price.tax;
  }
  if (data.price.tax_type && ((data.price.tax_type).toLowerCase() === "fixed" ||
  (data.price.tax_type).toLowerCase() === "percent")) {
    productObject.price.tax_type = (data.price.tax_type).toLowerCase();
  }

  productObject.shipping_details = {};
  if (data.shipping_details.cost) productObject.shipping_details.cost = data.shipping_details.cost;
  if (data.shipping_details.weight) {
    productObject.shipping_details.weight = data.shipping_details.weight;
  }
  if (data.shipping_details.length) {
    productObject.shipping_details.length = data.shipping_details.length;
  }
  if (data.shipping_details.width) {
    productObject.shipping_details.width = data.shipping_details.width;
  }
  if (data.shipping_details.height) {
    productObject.shipping_details.height = data.shipping_details.height;
  }

  productObject.manufacture_details = {};
  if (data.manufacture_details.make) {
    productObject.manufacture_details.make = data.manufacture_details.make;
  }
  if (data.manufacture_details.model_number) {
    productObject.manufacture_details.model_number = data.manufacture_details.model_number;
  }
  if (data.manufacture_details.release_date) {
    productObject.manufacture_details.release_date = data.manufacture_details.release_date;
  }

  productObject.download = {};
  if (data.download.downloadable && typeof data.download.downloadable === "boolean") {
    productObject.download.downloadable = data.download.downloadable;
    if (data.download.name) productObject.download.name = data.download.name;
  } else if (data.download.downloadable && (data.download.downloadable).toLowerCase() === "true") {
    productObject.download.downloadable = true;
    if (data.download.name) productObject.download.name = data.download.name;
  } else if (data.download.downloadable && (data.download.downloadable).toLowerCase() === "false") {
    productObject.download.downloadable = false;
    if (data.download.name) productObject.download.name = data.download.name;
  }

  if (data.extra_fields && typeof data.extra_fields === "object" && data.extra_fields[0].name &&
   data.extra_fields[0].value) {
    let fieldName;
    let fieldValue;
    const fieldArray = [];
    data.extra_fields.forEach((item, index, array) => {
      if (typeof item === "object" && item.name && item.value) {
        fieldName = data.extra_fields[index].name;
        fieldValue = data.extra_fields[index].value;
        fieldArray.push({ name: fieldName, value: fieldValue });
      }
    });
    productObject.extra_fields = {};
    productObject.extra_fields = fieldArray;
  }

  productObject.updated = Date.now();

  // Find product and update it with the request body
  return Product.findByIdAndUpdate(productId, productObject, { new: true })
    .then((result) => {
      if (!result) {
        return notFound(res, `Product not found with id ${productId}`);
      }
      return success(res, 200, result, "Product deleted successfully!");
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Product not found with id ${productId}\r\n${err.message}`);
      }
      return fail(res, 500, `Error updating product with id ${productId}\r\n${err.message}`);
    });
}

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  const recordId = req.params.productId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Product.findByIdAndRemove(recordId)
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
