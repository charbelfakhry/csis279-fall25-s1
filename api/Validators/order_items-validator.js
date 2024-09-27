const { check } = require('express-validator');

const insertOrderItemValidation = [
  check('user_id')
    .notEmpty().withMessage('User ID is required')
    .isMongoId().withMessage('Invalid User ID format'), // Adjust if using a different ID format
  check('product_id')
    .notEmpty().withMessage('Product ID is required')
    .isMongoId().withMessage('Invalid Product ID format'), // Adjust if using a different ID format
];

const updateOrderItemValidation = [
  check('user_id')
    .optional()
    .isMongoId().withMessage('Invalid User ID format'), // Optional but validated if provided
  check('product_id')
    .optional()
    .isMongoId().withMessage('Invalid Product ID format'), // Optional but validated if provided
];

module.exports = {
  insertOrderItemValidation,
  updateOrderItemValidation,
};
