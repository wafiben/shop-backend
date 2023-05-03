const express=require("express");
const isAuth=require('../midelwares/isAuth.js');
const {updateProfile}=require('../controllers/profileController.js');
const router=express.Router();
router.put('/profile',isAuth,updateProfile)

module.exports=router;