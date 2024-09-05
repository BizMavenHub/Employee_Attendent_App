const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_Controller");

router.post("/login", authController.Login);

module.exports = router;
