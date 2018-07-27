/*
* @author 4Dcoder
*/

import Blog from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Blog
exports.create = (req, res) => {
  // Validate request
  if (!req.body.content) {
    res.status(400).send({
      message: "Blog content can not be empty",
    });
  }

  // Create a Blog
  const blog = new Blog({
    kind: req.body.kind,
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author,
    content: req.body.content,
    tag: req.body.tag,
    image: req.body.image,
  });

  // Save Blog in the database
  blog.save()
    .then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Blog.",
      });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Blog.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.blogId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Blog.findById(req.params.recordId)
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

// Update a blog identified by the blogId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.content) {
    res.status(400).send({
      message: "Blog content can not be empty",
    });
  }

  // Find blog and update it with the request body
  Blog.findByIdAndUpdate(req.params.blogId, {
    kind: req.body.kind,
    title: req.body.title,
    summary: req.body.summary,
    author: req.body.author,
    content: req.body.content,
    tag: req.body.tag,
    image: req.body.image,
  }, { new: true })
    .then((blog) => {
      if (!blog) {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.send(blog);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404).send({
          message: `Blog not found with id ${req.params.blogId}`,
        });
      }
      res.status(500).send({
        message: `Error updating blog with id ${req.params.blogId}`,
      });
    });
};

// Delete a blog with the specified blogId in the request
exports.delete = (req, res) => {
  const recordId = req.params.blogId || "";
  // Validate request
  if (!recordId) return fail(res, 400, "Invalid record Id as request parameter");
  return Blog.findByIdAndRemove(recordId)
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
