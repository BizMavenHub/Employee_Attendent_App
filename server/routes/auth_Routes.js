const express = require("express");
const router = express.Router();
const User = require("../models/auth_Model");

const Login = require("../controllers/auth_Controller");

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const currentTime = Date.now();
    const lastLoginTime = new Date(user.last_login).getTime();
    const elapsedTimeInHours = (currentTime - lastLoginTime) / 1000; // Correct calculation for hours

    // Cap the maximum hours that can be earned in one session (e.g., 24 hours)
    const maxHoursPerSession = 24;
    const earnedHours = Math.min(elapsedTimeInHours, maxHoursPerSession);

    // Update total hours
    user.total_hours += earnedHours;

    // Update last login time to current time
    user.last_login = new Date();

    await user.save();

    res.json({
      id: user._id,
      username: user.username,
      total_hours: user.total_hours,
      last_login: user.last_login,
      earned_hours_this_session: earnedHours,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/login", Login.Login);

module.exports = router;
