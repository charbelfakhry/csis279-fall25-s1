const express = require("express");
const router = express.Router();

const {
  getAllCartItemsController,
  getCartItemByIdController,
  addProductToCartController,
  updateCartItemController,
  removeCartItemController,
  getCartItemsByUserIdController,
  clearUserCartController,
} = require("../controllers/CartItemController");

// GET ROUTES
router.get("/cart-items", getAllCartItemsController);
router.get("/cart-items/:id", getCartItemByIdController);
router.get("/cart-items/user/:userId", getCartItemsByUserIdController);

// POST ROUTES
router.post("/cart-items", addProductToCartController);

// PUT ROUTES
router.put("/cart-items/:id", updateCartItemController);

// DELETE ROUTES
router.delete("/cart-items/:id", removeCartItemController);
router.delete("/cart-items/clear", clearUserCartController);

module.exports = router;
