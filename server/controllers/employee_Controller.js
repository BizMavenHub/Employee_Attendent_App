const bcrypt = require("bcrypt");

const Employee = require("../models/employee_Model");

const getEmployees = async (req, res) => {
  const employees = await Employee.find();
  return res.status(200).json({ message: "Success", employees: employees });
};

const addEmployee = async (req, res) => {
  try {
    const employeeData = req.body;

    if (!employeeData.firstName || !employeeData.lastName) {
      return res
        .status(400)
        .json({ message: "Please enter firstName and lastName" });
    }

    if (!employeeData.password) {
      return res.status(400).json({ message: "Please enter password" });
    }

    const existedEmail = await Employee.findOne({
      email: employeeData.email,
    });

    if (existedEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (!employeeData.email) {
      return res.status(400).json({ message: "Please enter email" });
    }

    if (!employeeData.phoneNumber) {
      return res.status(400).json({ message: "Please enter phone number" });
    }

    if (!employeeData.birthday) {
      return res.status(400).json({ message: "Please enter birthday" });
    }

    if (!employeeData.role) {
      return res.status(400).json({ message: "Please enter role" });
    }

    const employeeUsername = employeeData.firstName + employeeData.lastName;

    const saltRounds = 5;

    const hashedPassword = await bcrypt.hashSync(
      employeeData.password,
      saltRounds
    );

    employeeData.password = hashedPassword;

    const newEmployee = new Employee({
      username: employeeUsername,
      lastLoginTime: null,
      ...employeeData,
    });

    await newEmployee.save();

    res.status(200).json({ message: "Success", employee: newEmployee });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getEmployees, addEmployee };
