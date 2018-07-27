
import Category from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Category
export const create = (req, res, next) => {

  if(!req.body.name){
    fail(res, 500, "Sorry, Product Category name is important")
  }
  const category = {
  name: req.body.name,
  description:  req.body.description,
  kind: req.body.kind,
  parent: req.body.parent,
  vendor: res.locals.id,
}
  Category.create(category)
    .then(category => category.view(true))
    .then(category => success(res, 201, category, "New Product Category has been successfully added"))
    .catch(next);
}
  

export const show = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then(category => (category ? category.view() : null))
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res, 404, "Product Category not  found"))
    .then(category => (category ? Object.assign(category, body).save() : null))
    .then(category => (category ? category.view(true) : null))
    .then(category => success(res, 200, category,"You have successfully updated Product CAtegory"))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then(category => (category ? category.remove() : null))
    .then(success(res, 200, [], "You have successfully deleted Product Category"))
    .catch(next);

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Category.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.categoryId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Category.findById(req.params.recordId)
    .then((result) => {
      if (!result) return notFound(res, 404, "Error record not found.");
      return success(res, 200, result, "retrieving record was successfully!");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, 404, `Error retrieving record.\r\n${err.message}`);
      }
      return fail(res, 500, `Error retrieving record.\r\n${err.message}`);
    });
}


// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    notFound(res, "Sorry, Product Category does not exist");
  }

  // Find category and update it with the request body
  Category.findByIdAndUpdate(req.params.categoryId, {
    name: req.body.name,
    description: req.body.description,
    kind: req.body.kind,
    parent: req.body.parent,
  }, { new: true })
    .then((category) => {
      if (!category) {
        notFound(res, "Sorry, Product Category does not exist");
      }
      success(res, 200,category, "You have successfully updated the product category");
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, "Sorry, Product Category does not exist");
      }
      fail(res, 500, "Error occur updating the category");
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  const recordId = req.params.categoryId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Category.findByIdAndRemove(recordId)
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
