const { check } = require('express-validator');

const updateReviewValidation = [
   
  check('made_on').isISO8601().withMessage('Invalid date format, must be a valid ISO 8601 date'),
];

module.exports = { updateReviewValidation };
