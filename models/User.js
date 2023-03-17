const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: email, required: true, unique: true },
  password: { type: password, required: true, unique: true },
  role: ["admin", "client", "company"],
});
module.exports = mongoose.model(userSchema, "user");
