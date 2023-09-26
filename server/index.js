const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { connectDB } = require("./utils/db.utils");
const authRoutes = require("./router/authRoute");
const todoRoutes = require("./router/taskRoute");

const dotenv = require("dotenv");
dotenv.config(__dirname + "/.env");

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to the MongoDB database
connectDB();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Middleware for enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Middleware for parsing cookies in the request
app.use(cookieParser());

// Routes for authentication and task management
app.use("/auth", authRoutes);
app.use("/task", todoRoutes);

// Route to check if the server is running
app.get("/", (req, res) => {
  res.send(`Server is running on ${PORT}`);
});

// Keep-alive endpoint to check server status
app.get("/keep-alive-endpoint", (req, res) => {
  try {
    return res.status(200).json({
      message: "Server is running",
    });
  } catch (error) {
    return res.status(401).json({
      message: "Error",
    });
  }
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
