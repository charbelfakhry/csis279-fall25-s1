const { Order } = require('../models/Order');

// Get all orders
const getOrders = async () => {
    try {
        return await Order.findAll();
    } catch (error) {
        console.error(`Error in getting the orders : `, error);
        throw error;

    }
};

// Get an order by user ID
const getOrderById = async (user_id) => {
    try {
        const order = await Order.findByPk(user_id);
        if (!order) {
            throw new error(`no orders found for the user id ${user_id}`);

        }
        return order;

    } catch (error) {
        console.error(`Error in finding orders for the user with id ${user_id}`, error);
        throw error;

    }
};

// Add an order
const addOrder = async (userId, order_shipping_address, order_total, made_on) => {
    try {
        return await Order.create({ user_id: userId, order_shipping_address: order_shipping_address, order_total: order_total, made_on: new Date() });
    } catch (error) {
        console.error(`Error in creating a new order `, error);
        throw error;

    }
};

// Delete an order
const deleteOrder = async (user_id) => {
    try {
        const deltedOrder = Order.destroy({ where: { user_id: user_id } });
        if (!deltedOrder) {
            throw new Error(`error in deleting the item no id found for the user ${user_id}`);
        }
        return deltedOrder;

    } catch (error) {
        console.error(`Error in deleting the  order with the user id ${user_id} : `, error);
        throw error;
    };
};


module.exports = {
    getOrders,
    getOrderById,
    addOrder,
    deleteOrder,

};