const reviewService = require("../services/reviewService");

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { review_id, review_body } = req.body;

      if (!review_id || !review_body) {
        return res
          .status(400)
          .json({ message: "Review ID and review body are required" });
      }

      const review = await reviewService.addReview(review_id, review_body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviews = await reviewService.getReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const review = await reviewService.getReviewById(reviewId);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const deleted = await reviewService.deleteReview(reviewId);

      if (!deleted) {
        return res.status(404).json({ message: "Review not found" });
      }

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reviewController;
