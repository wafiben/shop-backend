const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: ["admin", "client", "company"],
  googleId: String,
  nameOfComany: { type: String },
  zipCode: Number,
  country: String,
  domain: String,
  state: String,
  country: String,
  region: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'product' }]
});
module.exports = mongoose.model("User", userSchema);
