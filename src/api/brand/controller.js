
import Brand from "./model";
import { success, notFound, fail } from "./../../services/response/";

// Create and Save a new Brand
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    return fail(res, 400, "Brand description can not be empty");
  }

  // Create a Brand
  const brand = new Brand({
    name: req.body.name || "Untitled Brand",
    description: req.body.description,
    vendor: res.locals.id
  });

  // Save Brand in the database
  brand.save()
    .then((data) => {
      return success(res, 200, data, "You have successfully created Product Brand");
    }).catch((err) => {
      return fail(res, 500, err.message);
    });
};

// Retrieve and return all brands from the database.
exports.findAll = (req, res) => {
  Brand.find()
    .then((brands) => {
      return success(res, 200, brands)
    }).catch((err) => {
      return fail(res, 500, err.message)
    });
};

// Find a single brand with a brandId
exports.findOne = (req, res) => {
  Brand.findById(req.params.brandId)
    .then((brand) => {
      if (!brand) {
        notFound(res, "Sorry, Product Brand does not exist")
      }
      return success(res, 200, brand)
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, "Product Brand not found");
      }
      return fail(res, 500, "Error retreiving Product Brand");
    });
};

// Update a brand identified by the brandId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.description) {
    return fail(res, 400, "Brand description can not be empty")
  }

  // Find brand and update it with the request body
  Brand.findByIdAndUpdate(req.params.brandId, {
    name: req.body.name || "Untitled Brand",
    description: req.body.description,
  }, { new: true })
    .then((brand) => {
      if (!brand) {
        notFound(res, "Product Brand not found");
      }
      success(res, 200, brand.view(true), "You have successfully updated product brands");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, "Product Brand not found");
      }
      notFound(res, 500, "Error updating the Product Brand");
    });
};

// Delete a brand with the specified brandId in the request
exports.delete = (req, res) => {
  Brand.findByIdAndRemove(req.params.brandId)
    .then((brand) => {
      if (!brand) {
        notFound(res, "Sorry, Product Brand does not exist")
      }
      return success(res, 200, [], "You have successfully deleted the product brand");
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        notFound(res, "Sorry, Product Brand does not exist")
      }
      return fail(res, 500, "Error deleting Product Brand")
    });
};
