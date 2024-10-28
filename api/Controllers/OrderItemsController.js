const { getOrderItem,
  getOrderItemById,
  addOrderItem,
  deleteOrderItem, } = require("../Services/OrderItemService");

const orderItemController = {
  createOrderItem: async (req, res) => {
    try {
      const { userId, productId } = req.body;

      if (!userId || !productId) {
        return res
          .status(400)
          .json({ message: "User ID, Product ID are required" });
      }

      const orderItem = await addOrderItem(
        userId,
        productId
      );
      res.status(201).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllItemsByOrderId: async (req, res) => {
    try {
      const { orderId } = req.params;
      const orderItems = await getAllItemsByOrderId(orderId);

      if (orderItems.length === 0) {
        return res
          .status(404)
          .json({ message: "No items found for this order" });
      }

      res.status(200).json(orderItems);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderItemById: async (req, res) => {

    try {
      const { orderItemId } = req.params;
      const orderItem = await getOrderItemById(orderItemId);
      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }
      res.status(200).json(orderItem);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateOrderItem: async (req, res) => {
    try {
      const { orderItemId } = req.params;
      const { quantity, price } = req.body;

      const [updatedCount] = await updateOrderItem(
        orderItemId,
        quantity,
        price
      );

      if (updatedCount === 0) {
        return res
          .status(404)
          .json({ message: "Order item not found or no update needed" });
      }
      res.status(200).json({ message: "Order item updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteOrderItem: async (req, res) => {
    try {
      const { orderItemId } = req.params;
      const deleted = await deleteOrderItem(orderItemId);

      if (!deleted) {
        return res.status(404).json({ message: "Order item not found" });
      }

      res.status(200).json({ message: "Order item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderItemController;
