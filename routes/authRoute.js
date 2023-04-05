const express = require("express");
const isAuth = require("../midelwares/isAuth");
const { isAdmin, isClient, isCompany } = require("../midelwares/role");
const router = express.Router();
const {
  registerController,
  loginController,
  getProfile,
  registerControllerCompany
} = require("../controllers/authController");
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/register-company", registerControllerCompany);
router.get('/profile', isAuth, getProfile)
router.get("/x", isAuth, isCompany, (req, res) => {
  res.send("hey");
});

module.exports = router;
