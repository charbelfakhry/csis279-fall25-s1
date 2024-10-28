const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/OrdersController");

const { orderValidation } = require("../Validators/OrderValidator");

// GET ROUTES
router.get("/orders", orderController.getAllOrders);
router.get("/orders/userId/:user_id", orderController.getOrderById);
// router.get("/orders/:id/items", getOrderItemsController); 


// POST ROUTES
router.post("/order", orderController.createOrder, orderValidation);


// PUT ROUTES
// router.put("/orders/:id", updateOrderController, orderValidation());

// DELETE ROUTES
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
