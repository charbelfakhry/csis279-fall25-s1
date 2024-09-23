const express = require('express');
const router = express.Router();

const {
    getAllOrdersController,
    getOrderByIdController,
    createNewOrderController,
    updateOrderController,
    deleteOrderController,
    getOrderItemsController,
    addOrderItemController,
    getOrdersByUserIdController
} = require('../controllers/ordersController');

// GET ROUTES
router.get('/orders', getAllOrdersController);
router.get('/orders/:id', getOrderByIdController);
router.get('/orders/:id/items', getOrderItemsController);
router.get('/orders/user/:userId', getOrdersByUserIdController);

// POST ROUTES
router.post('/orders', createNewOrderController);
router.post('/orders/:id/items', addOrderItemController);

// PUT ROUTES
router.put('/orders/:id', updateOrderController);

// DELETE ROUTES
router.delete('/orders/:id', deleteOrderController);

module.exports = router;
