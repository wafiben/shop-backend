const mongoose = require("mongoose");
const url =
  "mongodb+srv://wafi:54900777@cluster0.ewu3a.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("db is sucessfully connected");
  } catch (error) {
    console.log("db is failed");
  }
};

module.exports = connectDB;
