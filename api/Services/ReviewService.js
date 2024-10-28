const  Review  = require('../Models/Review');

// Get all Reviews
const getReviews = async () => {
  try {
    return await Review.findAll();
  } catch (error) {
    console.error("Error fetching all reviews:", error);
    throw error;
  }
};

// Get a Review by ID
const getReviewById = async (review_id) => {
  try {
    const review = await Review.findByPk(review_id);
    if (!review) {
      throw new Error(`Review with ID ${review_id} not found`);
    }
    return review;
  } catch (error) {
    console.error(`Error fetching review with ID ${review_id}:`, error);
    throw error;
  }
};

// Add a Review
const addReview = async ( review_body) => {
  try {
    return await Review.create({review_body: review_body });
  } catch (error) {
    console.error("Error adding new review:", error);
    throw error;
  }
};

// Delete a Review
const deleteReview = async (review_id) => {
  try {
    const deleted = await Review.destroy({ where: { review_id: review_id } });
    if (!deleted) {
      throw new Error(`Review with ID ${review_id} not found`);
    }
    return deleted;
  } catch (error) {
    console.error(`Error deleting review with ID ${review_id}:`, error);
    throw error;
  }
};

module.exports = {
  getReviews,
  getReviewById,
  addReview,
  deleteReview,
};

