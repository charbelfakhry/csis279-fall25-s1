const { check } = require('express-validator');
const CategoryValidation = [
    check('category_name').notEmpty().withMessage('Category Name is required'),
]

const updateCategoryValidation = [
    check('category_name').notEmpty().withMessage('Category Name is required'),
]
module.exports={ CategoryValidation,
updateCategoryValidation
}
