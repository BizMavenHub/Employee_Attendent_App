const bcrypt = require("bcrypt");

const User = require("../models/auth_Model");

const Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Please enter username and password" });

  const user = await User.findOne({ username, password });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.username || !user.password) {
    return res.status(401).json({ message: "Invalid Password or Username" });
  }

  const last_login = Date.now();
  await User.findByIdAndUpdate(user._id, { last_login });

  if (username === user.username && password === user.password) {
    return res
      .status(200)
      .cookie("login_token", user._id)
      .json({ message: "Login Successful", user: user });
  }
};

module.exports = { Login };
