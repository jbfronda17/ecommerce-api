const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");

// Routes without params
// User registration
router.post("/register", userController.userRegistration);
// User authentication
router.post("/login", userController.userAuthentication);

module.exports = router;