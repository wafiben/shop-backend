const express = require("express");
const isAuth = require("../midelwares/isAuth");
const { isAdmin, isClient, isCompany } = require("../midelwares/role");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/authController");
router.post("/login", loginController);
router.post("/register", registerController);
router.get("/x", isAuth, isCompany, (req, res) => {
  res.send("hey");
});

module.exports = router;
