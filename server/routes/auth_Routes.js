const express = require("express");
const router = express.Router();

const Login = require("../controllers/auth_Controller");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/", Login.Login);

module.exports = router;
