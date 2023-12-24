const express = require("express");
const isAuth = require("../midelwares/isAuth.js");

const {
  getCompanyNotifications,
  getClientNotifications,
} = require("../controllers/notificationController.js");
const router = express.Router();

router.get("/notification-client", isAuth, getClientNotifications);
router.get("/notification-company", isAuth, getCompanyNotifications);

module.exports = router;
