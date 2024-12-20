const { getReviews,
  getReviewById,
  addReview,
  deleteReview, } = require("../Services/ReviewService");

const reviewController = {
  createReview: async (req, res) => {
    try {
      const { review_body } = req.body;

      if (!review_body) {
        return res
          .status(400)
          .json({ message: "review body is required" });
      }

      const review = await addReview(review_body);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviews = await getReviews();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReviewById: async (req, res) => {
    try {
      const { reviewId } = req.params;
      const review = await getReviewById(reviewId);
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
      const deleted = await deleteReview(reviewId);

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
