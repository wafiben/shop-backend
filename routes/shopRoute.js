const express = require("express");
const isAuth = require('../midelwares/isAuth.js');
const {makeOrderAsDraft}=require('../controllers/shopController.js')

const router = express.Router();

router.post('/shop', isAuth, makeOrderAsDraft);
module.exports = router;