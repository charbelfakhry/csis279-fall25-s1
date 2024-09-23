const express = require('express');
const router = express.Router();

const {
    getAllProductsController,
    getProductByIdController,
    createNewProductController,
    updateProductController,
    deleteProductControlelr,
    getProductByGetegoryController,
    getProductReviewsController,
    getProductsBasedOnReviews,
    searchForProductsController
} = require('../controllers/productsController');


// GET ROUTES
router.get('/products', getAllProductsController);
router.get('/product/:id', getProductByIdController);
router.get('/products/category/:categoryId', getProductByGetegoryController);
router.get('/product/:id/reviews', getProductReviewsController);
router.get('/products/top-rated', getProductsBasedOnReviews);
router.get('/products/search', searchForProductsController);


router.post('/product', createNewProductController);

// PUT ROUTES
router.put('/product/:id', updateProductController);

// DELETE ROUTES
router.delete('/product/:id', deleteProductControlelr); 