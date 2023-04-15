const express = require("express");
const { isClient } = require("../midelwares/role");
const isAuth = require('../midelwares/isAuth.js');
const { getAllCompany, getOneCompany } = require('../controllers/userController.js');
const router = express.Router();
router.get("/company", isAuth,  getAllCompany)
router.get('/company/:id', isAuth, getOneCompany)

module.exports = router;




