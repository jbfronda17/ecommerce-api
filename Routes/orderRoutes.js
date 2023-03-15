const express = require("express");
const router = express.Router();
const auth = require("../auth.js");
const orderController = require("../Controllers/orderController.js");

// Routes with params
// Non-admin user checkout (Create order)
router.post("/:productId", auth.verify, orderController.createOrder);

module.exports = router;