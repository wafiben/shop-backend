const clientNotification = require("../models/notifications/NotificationClient");
const companyNotification = require("../models/notifications/NotificationCompany");
const User = require("../models/User");

const sendNotificationToClient = async (userId, title, body) => {
  await clientNotification.create({
    userId: userId,
    title: title,
    body: body,
  });

  // Update the lastNotificationSeen field for the client
  await User.findByIdAndUpdate(userId, { lastNotificationSeen: new Date() });
};

const sendNotificationToCompany = async (companyId, title, body) => {
  await companyNotification.create({
    companyId: companyId,
    title: title,
    body: body,
  });

  // Update the lastNotificationSeen field for the company
  await User.findByIdAndUpdate(companyId, { lastNotificationSeen: new Date() });
};

module.exports = { sendNotificationToClient, sendNotificationToCompany };
