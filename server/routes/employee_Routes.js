const express = require("express");
const router = express.Router();

const employeeController = require("../controllers/employee_Controller");

router.get("/", employeeController.getEmployees);

router.post("/add-employee", employeeController.addEmployee);

module.exports = router;
