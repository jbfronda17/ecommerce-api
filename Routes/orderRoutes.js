const express = require("express");
const router = express.Router();
const auth = require("../auth.js");
const orderController = require("../Controllers/orderController.js");

// Routes without params
// Retrieve all orders (Admin only)
router.get("/allOrders", auth.verify, orderController.allOrders);

// Routes with params
// Non-admin user checkout (Create order)
router.post("/:productId", auth.verify, orderController.createOrder);
// Retrieve authenticated user's orders
router.get("/allOrders/:userId", auth.verify, orderController.userOrders);

module.exports = router;