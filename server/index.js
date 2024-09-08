const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

const authRouter = require("./routes/auth_Routes");
const timeLogRouter = require("./routes/timeLog_Routes");
const employeeRouter = require("./routes/employee_Routes");

dotenv.config();

const CorsOption = {
  origin: process.env.CLIENT_URL, // Allow all origins
  credentials: true,
  optionSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(CorsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); // Connect to MongoDB

app.use("/api/auth", authRouter);
app.use("/api/timeLog", timeLogRouter);
app.use("/api/employee", employeeRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log("Example app listening on port 3000!");
});

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
