
import { success, notFound, fail } from "./../../services/response/";
import Category from "./model";

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
  

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Category.count(query)
    .then(count => Category.find(query, select, cursor)
      .then(categorys => ({
        count,
        rows: categorys.map(category => category.view()),
      })), )
    .then(success(res))
    .catch(next);

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

// Retrieve and return all categorys from the database.
export const findAll = (req, res) => {
  Category.find({})
    .then((categories) => {
      success(res, 200, categories);
      
    }).catch((err) => {
      fail(res, 500, err.message);
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId)
    .then((category) => {
      if (!category) {
        notFound(res, "Sorry, Product Category does not exist")
      }
      success(res, 200, category)
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        notFound(res, "Sorry, Product Brand does not exist")
      }
      fail(res, 500, "Error occur trying to fetch product category");
    });
};

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
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (!category) {
        notFound(res, "Sorry, Product Category does not exist")
      }
      success(res, 200, [], "You have successfully deleted product category")
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        notFound(res, "Sorry, Product Category does not exist")
      }
      fail(res, 500, "Error ocuured while deleting product category")
    });
};
