const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {connectDB} = require("./utils/db.utils");
const authRoutes = require("./router/authRoute");
const todoRoutes = require("./router/taskRoute");

const dotenv = require("dotenv");
dotenv.config(__dirname + "/.env");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/task", todoRoutes)

app.get("/", (req, res) => {
  res.send(`server is running on ${PORT}`);
});

app.get("/keep-alive-endpoint", (req, res) => {
 
  try {
    return res.status(200).json({
      message: "server is running",
    });
  } catch (error) {
    return res.status(401).json({
      message: "error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});