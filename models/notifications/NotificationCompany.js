const mongoose = require("mongoose");

const companyNotificationSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  body: String,
  timestamp: { type: Date, default: Date.now },
});

const Notification = mongoose.model(
  "companyNotificationSchema",
  companyNotificationSchema
);

module.exports = Notification;
