const mongoose = require("mongoose");

const clientNotificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  body: String,
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model("clientNotificationSchema", clientNotificationSchema);

module.exports = Notification;
