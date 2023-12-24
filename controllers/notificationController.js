const NotificationClient=require('../models/notifications/NotificationClient');
const NotificationCompany=require('../models/notifications/NotificationCompany')

const getClientNotifications = async (req, res) => {
  const clientId = req.user._id;
  try {
    const clientNotifications = await NotificationClient.find({
      userId: clientId,
    }).sort({ timestamp: -1 });
    res.status(200).json({ clientNotifications });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCompanyNotifications = async (req, res) => {
  const companyId = req.user._id;
  try {
    const companyNotifications = await NotificationCompany.find({
      userId: companyId,
    }).sort({ timestamp: -1 });
    res.status(200).json({ companyNotifications });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCompanyNotifications, getClientNotifications }; 
