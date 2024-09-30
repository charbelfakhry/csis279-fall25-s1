const {check} = require('express-validaor');

const insertProductValidation = [
    check('product-name').notEmpty().withMessage('Product Name is required').custom(async (value) => {
        const product = await findProductByName(value); 
        if (product) {
          throw new Error('Product Name already exists');
        }
        return true;
      }),
    check('product_price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
    check('product_qty')
      .notEmpty().withMessage('Quantity is required')
      .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    check('category-name')
      .notEmpty().withMessage('Category name is required').custom(async (value) => {
        const category = await findCategoryByName(value); 
        if (!category) {
          throw new Error('Invalid Category Name');
        }
        return true;
      }),
      check('user_phone').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number format'),
      check('joined_on').notEmpty().withMessage('Joined date is required').isISO8601().withMessage('Invalid date format, must be YYYY-MM-DD'),

  ];

  const updateprodcutValidation = [
    check('product_name').notEmpty().withMessage('Product name is required'),
    check('product_price').notEmpty().withMessage('Price is required').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),

  ]
  module.exports = {
    insertProductValidation,
    updateprodcutValidation
  }
  
