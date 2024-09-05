const express = require("express");
const router = express.Router();

const timeLogController = require("../controllers/timeLog_Controller");

router.get("/:employeeId", timeLogController.getUserTimeLog);

router.get("/:employeeId/:timeLogId", timeLogController.getTimeLog);

router.post("/log-in/:employeeId", timeLogController.logIn);

router.post("/log-out/:employeeId", timeLogController.logOut);

module.exports = router;
