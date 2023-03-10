const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController.js");
const auth = require("../auth.js");

// Routes without params
// User registration
router.post("/register", userController.userRegistration);
// User authentication
router.post("/login", userController.userAuthentication);
// User details
router.get("/details", auth.verify, userController.userDetails);

module.exports = router;