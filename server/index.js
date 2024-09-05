const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();

const authRouter = require("./routes/auth_Routes");
const timeLogRouter = require("./routes/timeLog_Routes");

dotenv.config();

const CorsOption = ["http://localhost:5173", "http://192.168.1.9:5173"];

app.use(cors({ credentials: true, origin: CorsOption }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); // Connect to MongoDB

app.use("/auth", authRouter);
app.use("/timeLog", timeLogRouter);

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
