const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const app = express();

const router = require("./routes/auth_Routes");

const PORT = 3000;

const allowedOrigins = ["http://localhost:5173", "http://192.168.1.9:5173"];

app.use(cors({ credentials: true, origin: allowedOrigins }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); // Connect to MongoDB

app.use("/auth/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Example app listening on port 3000!");
});

async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://bizmavenhub:AlILjFcedCx6QbYS@cluster0.6z9aj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
