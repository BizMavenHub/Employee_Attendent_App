const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  username: { type: String },
  password: { type: String, required: true },
  email: { type: String, unique: true },
  birthday: { type: Date },
  phoneNumber: { type: String },
  role: { type: String },
  lastLoginTime: { type: Date },
  hourlyRate: { type: Number },
  totalHours: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  profilePicture: { type: String },
});

module.exports = mongoose.model("Employee", employeeSchema);
