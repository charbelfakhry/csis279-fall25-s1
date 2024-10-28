const express = require("express");
const router = express.Router();

const reviewController = require("../Controllers/ReviewController");

const {
  insertReviewValidation,
  updateReviewValidation,
} = require("../Validators/ReviewValidator");
// GET ROUTES
router.get("/reviews", reviewController.getAllReviews);
router.get("/review/:reviewId", reviewController.getReviewById);
// router.get("/reviews/product/:productId", getReviewsByProductIdController);
// router.get("/reviews/user/:userId", getReviewsByUserIdController);

// POST ROUTES
router.post("/review", reviewController.createReview, insertReviewValidation);

// PUT ROUTES
// router.put("/reviews/:id", updateReviewController, updateReviewValidation());

// DELETE ROUTES
router.delete("/review/:reviewId", reviewController.deleteReview);

module.exports = router;
