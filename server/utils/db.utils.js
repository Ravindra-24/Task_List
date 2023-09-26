const mongoose = require("mongoose");

// Function to connect to the MongoDB database
module.exports.connectDB = async () => {
  try {
    // Use the DB_URI from environment variables to connect
    await mongoose.connect(process.env.DB_URI, {});

    // Log a message when successfully connected
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
  }
};
