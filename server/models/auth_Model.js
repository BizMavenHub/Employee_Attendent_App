const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  last_login: { type: Date },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  total_hours: { type: Number, default: 0 },
  hour_rate: { type: Number },
  total_income: { type: Number, default: 0 },
});

module.exports = mongoose.model("User", userSchema);
