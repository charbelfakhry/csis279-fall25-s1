const { check } = require('express-validator');

const orderValidation = [
  check('order_payment_method')
    .notEmpty().withMessage('Payment method is required')
    .isIn(['COD', 'CARD', 'PAYPAL']) 
    .withMessage('Invalid payment method'),

  check('order_shipping_address')
    .notEmpty().withMessage('Shipping address is required')
    .isLength({ max: 100 }).withMessage('Shipping address must be at most 100 characters long'),

  check('order_total')
    .notEmpty().withMessage('Order total is required')
    .isFloat({ gt: 0 }).withMessage('Order total must be a positive number'),

  check('made_on')
    .notEmpty().withMessage('Order date is required')
    .isISO8601().withMessage('Invalid date format, must be a valid ISO 8601 date'),

  check('user_id')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be a valid integer'),
];

module.exports = { orderValidation };

