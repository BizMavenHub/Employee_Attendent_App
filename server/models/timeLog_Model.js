const mongoose = require("mongoose");

const timeLogSchema = new mongoose.Schema({
  employeeId: { type: String },
  loginTime: { type: Date },
  logoutTime: { type: Date },
  duration: { type: Number },
  earnings: { type: Number },
});

module.exports = mongoose.model("TimeLog", timeLogSchema);
