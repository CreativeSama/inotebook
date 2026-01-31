const mongoose = require("mongoose");

// ✅ DEPLOYMENT FIX (Mongo Atlas)
const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

module.exports = connectToMongo;