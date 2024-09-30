const { Order } = require('../models/Order'); 

// Get all orders
const getOrders = async () => {
    return await Order.findAll();
};

// Get an order by user ID
const getOrderById = async (user_id) => {
    return await Order.findByPk(user_id);
};

// Add an order
const addOrder = async (userId, order_shipping_address, order_total, made_on) => {
    return await Order.create({ user_id: userId, order_shipping_address: order_shipping_address, order_total: order_total, made_on: new Date() });
};

// Delete an order
const deleteOrder = async (user_id) => {
    return await Order.destroy({ where: { user_id: user_id } });
};



module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    deleteOrder,
   
};