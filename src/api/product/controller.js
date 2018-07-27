
import Product from "./model";
import { success, fail, notFound } from "../../services/response/index";

// Create and Save a new Product
exports.create = (req, res) => {
  const data = req.body;
  // Validate request
  if (!data.name) {
    return fail(res, 400, "Product name can not be empty");
  }
  // Create a Product
  const product = new Product({
    code: data.code,
    sku: data.sku,
    upc: data.upc,
    name: data.name,
    vendor: data.vendor_id,
    category: {
      main: data.category.main,
      sub: data.category.sub,
    },
    brand: data.brand,
    description: {
      color: data.description.color || [],
      unit: data.description.unit,
      long: data.description.long || "",
      short: data.description.short || "",
      tag: data.description.tag || [],
    },
    variety: {
      options: data.variety.options || false,
      parent: data.variety.parent || "",
    },
    price: {
      deal: data.price.deal,
      valuation: data.price.valuation,
      unit_price: data.price.unit_price,
      cost_price: data.price.cost_price,
      slash_price: data.price.slash_price,
      discount: data.price.discount,
      discount_type: data.price.discount_type,
      tax: data.price.tax,
      tax_type: data.price.tax_type,
    },
    shipping_details: {
      cost: data.shipping_details.cost,
      weight: data.shipping_details.weight,
      length: data.shipping_details.length,
      width: data.shipping_details.width,
      height: data.shipping_details.height,
    },
    manufacture_details: {
      make: data.manufacture_details.make,
      model_number: data.manufacture_details.model_number,
      release_date: data.manufacture_details.release_date,
    },
    download: {
      downloadable: data.download.downloadable,
      download_name: data.download.download_name,
    },
    extra_fields: data.extra_fields,
    vendor: res.locals.id,
  });

  // Save Product in the database
  return product.save()
    .then((result) => {
      if (!result) {
        return fail(res, 404, "Error not found newly added product");
      }
      return success(res, 200, result, "New product record has been created successfully!");
    })
    .catch(err => fail(res, 500, `Error occurred while creating the Product. ${err.message}`));
};

// Retrieve and return all products from the database.
exports.findAll = (req, res) => Product
  .find({})
  .then((result) => {
    if (!result) {
      return notFound(res, "Error: product not found");
    }
    return success(res, 200, result, "product(s) retrieved successfully!");
  })
  .catch(err => fail(res, 500, `Error retrieving product(s).\r\n ${err.message}`));


// Find a single product with a productId
exports.findOne = (req, res) => {
  const { data } = req.body;
  const { productId } = req.params.productId;

  // Validate request
  if (!productId) return fail(res, 400, "Invalid Product Id as request parameter");
  if (!data.name) return fail(res, 400, "Product name can not be empty");

  return Product.findById(productId)
    .then((result) => {
      if (!result) {
        return fail(res, 404, `Error: product not found with id ${productId}`);
      }
      return success(res, 200, result.veiw(true), "product(s) retrieved successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Error: product not found with id ${productId}.\r\n ${err.message}`);
      }
      return fail(res, 500, `Error retrieving product with id ${productId}.\r\n ${err.message}`);
    });
};

// Update a product identified by the productId in the request
exports.update = (req, res) => {
  const data = req.body;
  const productId = req.params.productId;

  // Validate request
  if (!productId) return fail(res, 400, "Invalid Product Id as request parameter");
  if (!data.name) return fail(res, 400, "Product name can not be empty");

  // Create a Product
  const product = {
    code: data.code,
    sku: data.sku,
    upc: data.upc,
    name: data.name,
    category: {
      main: data.category.main,
      sub: data.category.sub,
    },
    brand: data.brand,
    description: {
      color: data.description.color,
      unit: data.description.unit,
      long: data.description.long,
      short: data.description.short,
      tag: data.description.tag,
    },
    variety: {
      options: data.variety.options,
      parent: data.variety.parent,
    },
    price: {
      deal: data.price.deal,
      valuation: data.price.valuation,
      unit_price: data.price.unit_price,
      cost_price: data.price.cost_price,
      slash_price: data.price.slash_price,
      discount: data.price.discount,
      discount_type: data.price.discount_type,
      tax: data.price.tax,
      tax_type: data.price.tax_type,
    },
    shipping_details: {
      cost: data.shipping_details.cost,
      weight: data.shipping_details.weight,
      length: data.shipping_details.length,
      width: data.shipping_details.width,
      height: data.shipping_details.height,
    },
    manufacture_details: {
      make: data.manufacture_details.make,
      model_number: data.manufacture_details.model_number,
      release_date: data.manufacture_details.release_date,
    },
    download: {
      downloadable: data.download.downloadable,
      name: data.download.name,
    },
    extra_fields: data.extra_fields,
    standing: data.standing || "suspended",
  };


  // Find product and update it with the request body
  return Product.findByIdAndUpdate(productId, product, { new: true })
    .then((result) => {
      if (!result) {
        return notFound(res, `Product not found with id ${productId} first`);
      }
      return success(res, 200, result.view(true), "Product deleted successfully!");
    }).catch((err) => {
      console.log(err);
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Product not found with id ${productId} second`);
      }
      return fail(res, 500, `Error updating product with id ${productId}`);
    });
};

// Delete a product with the specified productId in the request
exports.delete = (req, res) => {
  const { productId } = req.params.productId;

  // Validate request
  if (!productId) return fail(res, 400, "Invalid Product Id as request parameter");

  return Product.findByIdAndRemove(productId)
    .then((product) => {
      if (!product) return notFound(res, `Product not found with id ${productId}`);
      return success(res, 200, [], "Product deleted successfully!");
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return notFound(res, `Product not found with id ${productId}`);
      }
      return fail(res, 500, `Could not delete product with id ${productId}`);
    });
};
