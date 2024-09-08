const express = require("express");
const router = express.Router();

const timeLogController = require("../controllers/timeLog_Controller");

router.get("/:employeeId", timeLogController.getUserTimeLog);

router.post("/log-out/:employeeId", timeLogController.logOut);

module.exports = router;
