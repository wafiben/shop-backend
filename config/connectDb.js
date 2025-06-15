const mongoose = require("mongoose");
const url = "mongodb+srv://wafibenjeddou:8w2czkwRroGjJDOo@cluster0.2lbtabt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("db is sucessfully connected");
  } catch (error) {
    console.log("db is failed");
  }
};

module.exports = connectDB;
