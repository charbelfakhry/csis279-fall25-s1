const { Cart_Items } = require('../models/Cart_Items'); 

// Get all CartItems
const getCartItems = async () => {
    return await Cart_Items.findAll();
};

// Get an Cart_Items by ID
const getCartItemsById = async (Cart_Items_id) => {
    return await Cart_Items.findByPk(Cart_Items_id);
};

// Add an Cart_Items
const addCartItems = async (Cart_Items_id, Cart_Items_date ) => {
    return await Cart_Items.create({ Cart_Items_id: Cart_Items_id, Cart_Items_date: Cart_Items_date });
};

// Delete an Cart_Items
const deleteCartItems = async (Cart_Items_id) => {
    return await Cart_Items.destroy({ where: { CartItems_id: Cart_Items_id } });
};


module.exports = {
    getCartItems,
    getCartItemsById,
    addCartItems,
    deleteCartItems,
    getCartItemsByUserId,
};