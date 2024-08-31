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

  // Check if the last login time is different before updating
  const currentTime = new Date();
  const lastLoginTime = user.last_login ? new Date(user.last_login) : null;

  if (!lastLoginTime || currentTime.getTime() !== lastLoginTime.getTime()) {
    user.last_login = currentTime;
    await user.save();
  }
  await user.save();

  if (username === user.username && password === user.password) {
    return res
      .status(200)
      .cookie("login_token", user._id)
      .json({ message: "Login Successful", user: user });
  }
};

module.exports = { Login };
