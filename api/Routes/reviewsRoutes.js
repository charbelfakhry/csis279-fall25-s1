const express = require('express');
const router = express.Router();

const {
    getAllReviewsController,
    getReviewByIdController,
    createNewReviewController,
    updateReviewController,
    deleteReviewController,
    getReviewsByProductIdController,
    getReviewsByUserIdController
} = require('../controllers/reviewsController');

// GET ROUTES
router.get('/reviews', getAllReviewsController);
router.get('/reviews/:id', getReviewByIdController);
router.get('/reviews/product/:productId', getReviewsByProductIdController);
router.get('/reviews/user/:userId', getReviewsByUserIdController);

// POST ROUTES
router.post('/reviews', createNewReviewController);

// PUT ROUTES
router.put('/reviews/:id', updateReviewController);

// DELETE ROUTES
router.delete('/reviews/:id', deleteReviewController);

module.exports = router;
