
import Vendor from "./model";
import { success, fail, notFound } from "../../services/response/index";

// Retrieve and return all vendors from the database.
export function findAll(req, res) {
  Vendor.find()
    .then(vendors => success(res, 200, vendors, "Records found!"))
    .catch(err => fail(res, 500, err.message || "Some error occurred while retrieving vendors."));
}

// Find a single vendor with a vendorId
export const findOne = (req, res) => Vendor
  .findById(req.params.vendorId)
  .then((vendor) => {
    if (!vendor) return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
    return res.send(vendor);
  })
  .catch((err) => {
    if (err.kind === "ObjectId") {
      return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
    }
    return fail(res, 500, `Error retrieving vendor with id ${req.params.vendorId}`);
  });


// Update a vendor identified by the vendorId in the request
export const update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    return fail(res, 500, "Vendor content can not be empty");
  }

  const newVendor = {};
  const keys = Object.keys(req.body);
  const values = Object.values(req.body);
  for (let i = 0; i <= keys.length; i += 1) {
    if (values[i] !== null && values[i] !== ""
    && ["updated", "updatedAt", "createdAt", "__v", "_id"].indexOf(keys[i]) === -1) {
      newVendor.keys[i] = values[i];
    }
  }

  // Find vendor and update it with the request body
  Vendor.findByIdAndUpdate(req.params.vendorId, { newVendor }, { new: true })
    .then((vendor) => {
      if (!vendor) {
        return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
      }
      return res.send(vendor);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
      }
      return fail(res, 500, `Error updating vendor with id ${req.params.vendorId}`);
    });
  return null;
};

// Delete a vendor with the specified vendorId in the request
exports.delete = (req, res) => Vendor
  .findByIdAndRemove(req.params.vendorId)
  .then((vendor) => {
    if (!vendor) {
      return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
    }
    return res.send({ message: "Vendor deleted successfully!" });
  })
  .catch((err) => {
    if (err.kind === "ObjectId" || err.name === "NotFound") {
      return notFound(res, `Vendor not found with id ${req.params.vendorId}`);
    }
    return fail(res, 500, `Error!  Could not delete vendor with id ${req.params.vendorId}`);
  });
