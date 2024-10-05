const { cartItems } = require('../models/cartItems'); // Model cartItems is missing

// Get all CartItems
const getCartItems = async () => {
    try {
        return await cartItems.findAll();
    } catch (error) {
        console.error(`Error in fetching for cart items`);
        throw error;
    }
};

// Get an cartItems by ID
const getCartItemsById = async (cartItems_id) => {
    try {
        const cartItem = await cartItems.findByPk(cartItems_id);
        if (!cartItem) {
            throw new Error(`cart items with the id ${cartItems_id} are not found`);
        }
        return await cartItems.findByPk(cartItems_id);
    } catch (error) {
        console.error(`Error in finding cart Items with the cartItem id ${cartItems_id}`, error);
        throw error;
    }
};


//needs testing wrote this fast
// Get an cartItems by User ID
const getCartItemsByUserId = async (cartItems_user_id) => {
    try {
        const cartItems = await cartItems.findAll({ where: { cartItems_user_id: cartItems_user_id } });
        if (!cartItems) {
            throw new Error(`cart items with the user id ${cartItems_user_id} are not found`);
        }
        return cartItems;
    } catch (error) {
        console.error(`Error in finding cart Items with the user id ${cartItems_user_id}`, error);
        throw error;
    }
};

// Add an cartItems
const addCartItems = async (cartItems_id, cartItems_date) => {
    try {
        return await cartItems.create({ cartItems_id: cartItems_id, cartItems_date: cartItems_date });
    } catch (error) {
        console.error(`error in adding a new cart item`, error);
        throw error;
    }
};

// Delete an cartItems
const deleteCartItems = async (cartItems_id) => {
    try {
        const deltedCartItem = await cartItems.destroy({ where: { cartItems_id: cartItems_id } });
        if (!deltedCartItem) {
            throw new Error(`No cart item found to delete with the id ${cartItems}`, error);

        }
    } catch (error) {
        console.error(`Error in deleting the cart item with the id ${cartItems_id}`, error);
        throw error;
    }
};


module.exports = {
    getCartItems,
    getCartItemsById,
    addCartItems,
    deleteCartItems,
    getCartItemsByUserId,
};