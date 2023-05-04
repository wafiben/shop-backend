const express=require("express");
const isAuth=require('../midelwares/isAuth.js');
const {updateProfile,checkPassword}=require('../controllers/profileController.js');
const router=express.Router();
router.put('/profile',isAuth,updateProfile);
router.post('/profile',isAuth,checkPassword)

module.exports=router;