const express = require('express');
const router = express.Router();

const {
    getAllOrderItemsController,
    getOrderItemByIdController,
    createNewOrderItemController,
    updateOrderItemController,
    deleteOrderItemController
} = require('../controllers/orderItemsController');


const {
    insertOrderItemValidation,
    updateOrderItemValidation,
} = require('../Validators/order_items-validator');

// GET ROUTES
router.get('/order-items', getAllOrderItemsController);
router.get('/order-items/:id', getOrderItemByIdController);

// POST ROUTES
router.post('/order-items', createNewOrderItemController,
    insertOrderItemValidation());

// PUT ROUTES
router.put('/order-items/:id', updateOrderItemController,
    updateOrderItemValidation());

// DELETE ROUTES
router.delete('/order-items/:id', deleteOrderItemController);

module.exports = router;
