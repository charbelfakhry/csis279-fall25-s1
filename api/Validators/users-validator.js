const { check } = require('express-validator');

const insertUserValidation = [
  check('user_username').notEmpty().withMessage('User Name is required'),
  check('user_email').isEmail().withMessage('Invalid Email Format'),
  check('user_pass').notEmpty().withMessage('User Password is required'),
  check('user_email').custom(async (value) => {
    const user = await findUserByEmail(value); 
    if (user) {
      throw new Error('Email already in use');
    }
    return true;
  }),
  check('user_pass').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('user_pass').isStrongPassword().withMessage("You entered a weak password. Try adding numbers and characters"),
  check('user_phone').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number format'),
  check('joined_on').notEmpty().withMessage('Joined date is required').isISO8601().withMessage('Invalid date format, must be YYYY-MM-DD'),
];

const updateUserValidation = [
  check('user_username').notEmpty().withMessage('User Name is required'),
  check('user_email').isEmail().withMessage('Invalid Email Format'),
  check('user_pass').notEmpty().withMessage('User Password is required'),
  check('user_pass').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('user_pass').isStrongPassword().withMessage("You entered a weak password. Try adding numbers and characters"),
  check('user_phone').notEmpty().withMessage('Phone number is required').isMobilePhone().withMessage('Invalid phone number format'),

];

module.exports = {
  insertUserValidation,
  updateUserValidation,
};
