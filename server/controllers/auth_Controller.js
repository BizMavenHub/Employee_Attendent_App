const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const Employee = require("../models/employee_Model");
const TimeLog = require("../models/timeLog_Model");

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please enter email and password" });
  }

  try {
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(password, employee.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const currentTime = new Date();
    employee.lastLoginTime = currentTime;

    const token = uuidv4();

    const timeLog = new TimeLog({
      employeeId: employee._id,
      loginTime: currentTime,
    });

    await timeLog.save();
    await employee.save();

    return res
      .status(200)
      .cookie("access_token", token, { secure: false })
      .json({ message: "Login successful", employee: employee });
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = { Login };
