const express = require("express");
const router = express.Router();

const productController = require("../Controllers/ProductController");

const {
  insertProductValidation,
  updateprodcutValidation,
} = require("../Validators/ProductValidator");

// GET ROUTES
router.get("/products", productController.getAllProducts);
router.get("/product/:productId", productController.getProductById);
// router.get("/products/category/:categoryId", getProductByGetegoryController);
// router.get("/product/:id/reviews", getProductReviewsController);
// router.get("/products/top-rated", getProductsBasedOnReviews);
// router.get("/products/search", searchForProductsController);

router.post("/product", productController.createProduct, insertProductValidation);

// PUT ROUTES
router.put("/product/:productId", productController.updateProduct, updateprodcutValidation);

// DELETE ROUTES
router.delete("/product/:productId", productController.deleteProduct);


module.exports = router;