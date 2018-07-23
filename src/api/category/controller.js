
import { success, notFound } from "./../../services/response/";
import { Category } from ".";

// Create and Save a new Category
export const create = ({ bodymen: { body } }, res, next) =>
  Category.create(body)
    .then(category => category.view(true))
    .then(success(res, 201))
    .catch(next);

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
    .then(notFound(res))
    .then(category => (category ? Object.assign(category, body).save() : null))
    .then(category => (category ? category.view(true) : null))
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Category.findById(params.id)
    .then(notFound(res))
    .then(category => (category ? category.remove() : null))
    .then(success(res, 204))
    .catch(next);

// Retrieve and return all categorys from the database.
export const findAll = (req, res) => {
  Category.find()
    .then((categorys) => {
      res.send(categorys);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving categorys.",
      });
    });
};

// Find a single category with a categoryId
exports.findOne = (req, res) => {
  Category.findById(req.params.categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.send(category);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.status(500).send({
        message: `Error retrieving category with id ${req.params.categoryId}`,
      });
    });
};

// Update a category identified by the categoryId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    res.status(400).send({
      message: "Category name can not be empty",
    });
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
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.send(category);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.status(500).send({
        message: `Error updating category with id ${req.params.categoryId}`,
      });
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.send({ message: "Category deleted successfully!" });
    }).catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        res.status(404).send({
          message: `Category not found with id ${req.params.categoryId}`,
        });
      }
      res.status(500).send({
        message: `Could not delete category with id ${req.params.categoryId}`,
      });
    });
};
