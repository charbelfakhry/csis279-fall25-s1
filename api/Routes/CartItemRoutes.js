const express = require("express");
const router = express.Router();

const {
  getCartItems,
  getCartItemsById,
  addCartItems,
  updateCartItemController,
  deleteCartItems,
  getCartItemsByUserId,
  clearUserCartController,
} = require("../Controllers/CartItemController");

// GET ROUTES
router.get("/cart-items", getCartItems);
router.get("/cart-items/:id", getCartItemsById);
router.get("/cart-items/user/:userId", getCartItemsByUserId);

// POST ROUTES
router.post("/cart-items", addCartItems);

// PUT ROUTES
router.put("/cart-items/:id", updateCartItemController);

// DELETE ROUTES
router.delete("/cart-items/:id", deleteCartItems);
router.delete("/cart-items/clear", clearUserCartController);

module.exports = router;
