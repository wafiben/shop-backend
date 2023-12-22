const express = require("express");
const isAuth = require("../midelwares/isAuth.js");
const {
  makeOrderAsDraft,
  getListOrderOFclient,
  getListOrderOFCompany,
} = require("../controllers/shopController.js");
const { isCompany } = require("../midelwares/role.js");

const router = express.Router();

router.post("/shop", isAuth, makeOrderAsDraft);
router.get("/shop-client", isAuth, getListOrderOFclient);
router.get("/shop-company", isAuth, isCompany, getListOrderOFCompany);
module.exports = router;
