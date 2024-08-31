const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  last_login: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
