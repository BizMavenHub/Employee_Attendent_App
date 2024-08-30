const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  last_login: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
