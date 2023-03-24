const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: ["admin", "client", "company"],
  googleId: String,
  nameOfComany: { type: String },
  zipCode: Number,
  country: String,
});
module.exports = mongoose.model("User", userSchema);
