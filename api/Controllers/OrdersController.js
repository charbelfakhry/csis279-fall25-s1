const orderService = require("../Services/OrderService");

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { userId, order_shipping_address, order_total } = req.body;

      if (!userId || !order_shipping_address || !order_total) {
        return res.status(400).json({ message: 'User ID, shipping address, and total amount are required' });
      }

      const order = await orderService.addOrder(userId, order_shipping_address, order_total, new Date());
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllOrders: async (req, res) => {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getOrderById: async (req, res) => {
    try {
      const { user_id } = req.params;
      const order = await orderService.getOrderById(user_id);
      if (!order) {
        return res.status(404).json({ message: `Order not found for user ID ${user_id}` });
      }
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteOrder: async (req, res) => {
    try {
      const { user_id } = req.params;
      const deleted = await orderService.deleteOrder(user_id);

      if (!deleted) {
        return res.status(404).json({ message: `Order not found for user ID ${user_id}` });
      }

      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = orderController;
