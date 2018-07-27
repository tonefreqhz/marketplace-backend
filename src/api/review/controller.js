
import Review, { ObjectId } from "./model";
import { success, fail, notFound } from "./../../services/response";

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate request
  if (!req.body.subject) {
    res.status(404)
      .json({
        success: false,
        data: [],
        message: "Review content can not be empty",
      });
  }

  // Create a Review
  const newReview = new Review({
    customer_id: req.body.customer_id,
    subject: req.body.subject,
    subject_id: req.body.subject_id,
    comment: req.body.comment,
    rating: req.body.rating,
  });

  // Save Review in the database
  newReview.save()
    .then((review) => {
      res.status(200)
        .json({
          success: true,
          data: review,
          message: "Record(s)",
        });
    }).catch((err) => {
      res.status(500)
        .json({
          success: false,
          data: [],
          message: err.message || "Some error occurred while creating the Review.",
        });
    });
};

// Retrieve and return all records from the database.
export function findAll(req, res) {
  return Review.find()
    .then(result => success(res, 200, result, "retrieving record(s) was successfully!"))
    .catch(err => fail(res, 500, `Error retrieving record(s).\r\n${err.message}`));
}

// Retrieve a single record with a given recordId
export function findOne(req, res) {
  const recordId = req.params.reviewId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Review.findById(recordId)
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

// Update a review identified by the reviewId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.subject) {
    res.status(400)
      .json({
        success: false,
        data: [],
        message: "Review subject can not be empty",
      });
  }

  // Find review and update it with the request body
  Review.findByIdAndUpdate(req.params.reviewId, {
    customer_id: req.body.customer_id,
    subject: req.body.subject,
    subject_id: req.body.subject_id,
    comment: req.body.comment,
    rating: req.body.rating,
  }, { new: true })
    .then((review) => {
      if (!review) {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: `Review not found with id ${req.params.reviewId}`,
          });
      }
      res.send(review);
    }).catch((err) => {
      if (err.kind === "ObjectId") {
        res.status(404)
          .json({
            success: false,
            data: [],
            message: err.message || `Review not found with id ${req.params.reviewId}`,
          });
      }
      res.status(500).send({
        message: `Error updating review with id ${req.params.reviewId}`,
      });
    });
};

// Delete a review with the specified reviewId in the request
exports.delete = (req, res) => {
  const recordId = req.params.reviewId || "";
  if (!recordId) return fail(res, 400, "No record Id as request parameter");
  if (!ObjectId.isValid(recordId)) return fail(res, 422, "Invalid record Id as request parameter");
  return Review.findByIdAndRemove(recordId)
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
