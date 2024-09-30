const cartItemService = require("../services/cartItemService"); // Import the cart item service.

const cartItemController = {
  
  createCartItem: async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || !quantity) {
        return res.status(400).json({ message: 'User ID, Product ID, and quantity are required' });
      }

      const cartItem = await cartItemService.createCartItem(userId, productId, quantity);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ message: error.message }); 
    }
  },

  getCartItemsByUserId: async (req, res) => {
    try {
      const { userId } = req.params; 
      const cartItems = await cartItemService.getCartItemsByUserId(userId);

      if (cartItems.length === 0) {
        return res.status(404).json({ message: 'No items found in the cart for this user' });
      }

      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  updateCartItem: async (req, res) => {
    try {
      const { cartItemId } = req.params; 
      const { quantity } = req.body;

      const [updatedCount] = await cartItemService.updateCartItem(cartItemId, quantity);

      if (updatedCount === 0) {
        return res.status(404).json({ message: 'Cart item not found or no update needed' });
      }
      res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

 
  deleteCartItem: async (req, res) => {
    try {
      const { cartItemId } = req.params; 
      const deleted = await cartItemService.deleteCartItem(cartItemId);

      if (!deleted) {
        return res.status(404).json({ message: 'Cart item not found' });
      }

      res.status(200).json({ message: 'Cart item deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = cartItemController; 
