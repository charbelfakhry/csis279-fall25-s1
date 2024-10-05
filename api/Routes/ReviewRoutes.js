const express = require("express");
const router = express.Router();

const {
  getAllReviewsController,
  getReviewByIdController,
  createNewReviewController,
  updateReviewController,
  deleteReviewController,
  getReviewsByProductIdController,
  getReviewsByUserIdController,
} = require("../Controllers/ReviewController");

const {
  insertReviewValidation,
  updateReviewValidation,
} = require("../Validators/ReviewValidator");
// GET ROUTES
router.get("/reviews", getAllReviewsController);
router.get("/reviews/:id", getReviewByIdController);
router.get("/reviews/product/:productId", getReviewsByProductIdController);
router.get("/reviews/user/:userId", getReviewsByUserIdController);

// POST ROUTES
router.post("/reviews", createNewReviewController, insertReviewValidation());

// PUT ROUTES
router.put("/reviews/:id", updateReviewController, updateReviewValidation());

// DELETE ROUTES
router.delete("/reviews/:id", deleteReviewController);

module.exports = router;
