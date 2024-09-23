const express = require('express');
const router = express.Router();

const {
    getAllOrderItemsController,
    getOrderItemByIdController,
    createNewOrderItemController,
    updateOrderItemController,
    deleteOrderItemController
} = require('../controllers/orderItemsController');

// GET ROUTES
router.get('/order-items', getAllOrderItemsController);
router.get('/order-items/:id', getOrderItemByIdController);

// POST ROUTES
router.post('/order-items', createNewOrderItemController);

// PUT ROUTES
router.put('/order-items/:id', updateOrderItemController);

// DELETE ROUTES
router.delete('/order-items/:id', deleteOrderItemController);

module.exports = router;
