const express = require("express");
const router = express.Router();
const auth = require("../auth.js");
const productController = require("../Controllers/productController.js");

// Routes without params
// Create product (Admin only)
router.post("/addProduct", auth.verify, productController.addProduct);

module.exports = router;