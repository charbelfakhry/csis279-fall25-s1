const { order_items } = require('../models/Order_Items'); 

// Get all order_items
const getOrder_Items = async () => {
    return await Order_Items.findAll();
};

// Get an order by ID
const getOrder_ItemsById = async (user_id) => {
    return await Order_Items.findByPk(user_id);
};

// Add an order_Itmes
const addOrder_Items = async (user_id, product_id) => {
    return await Order_Items.create({ user_id: user_id, product_id: product_id, });
};

// Delete an order
const deleteOrder_Items = async (user_id) => {
    return await Order_Items.destroy({ where: { user_id: user_id } });
};



module.exports = {
    getOrder_Items,
    getOrder_ItemsById,
    addOrder_Items,
    deleteOrder_Items,
   
};