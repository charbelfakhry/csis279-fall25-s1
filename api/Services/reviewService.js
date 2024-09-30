const { Reviews } = require('../models/Reviews'); 

// Get all Reviewss
const getReviewss = async () => {
    return await Reviews.findAll();
};

// Get an Reviews by ID
const getReviewsById = async (review_id) => {
    return await Reviews.findByPk(review_id);
};

// Add an Reviews
const addReviews = async (review_id, review_body) => {
    return await Reviews.create({ review_id: review_id, review_body: review_body });
};

// Delete an Reviews
const deleteReviews = async (review_id) => {
    return await Reviews.destroy({ where: { review_id: review_id } });
};


module.exports = {
    getReviewss,
    getReviewsById,
    addReviews,
    deleteReviews,
   
};