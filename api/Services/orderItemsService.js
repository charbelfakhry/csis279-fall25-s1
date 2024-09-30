const { OrderItem } = require('../models/order-item');

// Get all OrderItem
const getOrderItem = async () => {
    try {
        return await OrderItem.findAll();

    } catch (error) {
        console.error(`Error in fetchin all order items : `, error);
        throw error;

    }
};

// Get an order by ID
const getOrderItemById = async (user_id) => {
    try {
        const orderItem = await orderItem.findByPk(user_id);
        if (!orderItem) {
            throw new Error(`order item for the user id ${user_id} is not found`);
        }
        return orderItem;

    } catch (error) {
        console.error(`Error fetching order item for the user with id ${user_id} `, error);
        throw error;

    }
};

// Add an order_Itmes
const addOrderItem = async (user_id, product_id) => {
    try {
        return await OrderItem.create({ user_id: user_id, product_id: product_id, });

    } catch (error) {
        console.error(`Error in creating a new order item`, error);
        throw error;

    }
};

// Delete an order
const deleteOrderItem = async (user_id) => {
    try {
        const deletedOrderItem = await orderItem.destroy({ where: { user_id: user_id } });
        if (!deleted) {
            throw new Error(`order item with the user id ${user_id} is not found`);
        }
        return deletedOrderItem;
    } catch (error) {
        console.error(`Error deleting order items with the user id ${user_id}`, error);
        throw error;

    }
};



module.exports = {
    getOrderItem,
    getOrderItemById,
    addOrderItem,
    deleteOrderItem,

};