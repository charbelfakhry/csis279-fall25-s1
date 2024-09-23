const { check } = require('express-validator');

const insertReviewValidation = [
  check('review_body')
    .notEmpty().withMessage('Review body is required')
    .isLength({ min: 10 }).withMessage('Review must be at least 10 characters long'),
];

const updateReviewValidation = [
  check('review_id')
    .notEmpty().withMessage('Review ID is required')
    .isMongoId().withMessage('Invalid Review ID format'), 
  check('review_body')
    .optional()
    .isLength({ min: 10 }).withMessage('Review must be at least 10 characters long'),];

module.exports = {
  insertReviewValidation,
  updateReviewValidation,
};
