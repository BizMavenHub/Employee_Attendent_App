const Employee = require("../models/employee_Model");
const TimeLog = require("../models/timeLog_Model");

const getUserTimeLog = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const timeLog = await TimeLog.find({ employeeId }); // Fetch all time logs for the employee
    return res.status(200).json({ message: "Success", timeLog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logOut = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const employee = await Employee.findById(employeeId);

    // Find the most recent time log entry where logoutTime is not set
    const timeLog = await TimeLog.findOne({
      employeeId: employee._id,
      logoutTime: null,
    });

    if (!timeLog) {
      return res.status(400).json({ message: "No active time log found" });
    }

    // Calculate the duration in seconds
    const logoutTime = new Date();
    const duration = (logoutTime - timeLog.loginTime) / 1000 / 60 / 60; // Convert to hours

    // Update the time log with the logout time and duration
    timeLog.logoutTime = logoutTime;
    timeLog.duration = duration;
    await timeLog.save();

    // Update the employee's total hours
    employee.totalHours += duration;
    await employee.save();

    return res.status(200).json({ message: "Logout successful", timeLog });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { logOut, getUserTimeLog };
