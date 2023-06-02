const express=require("express");
const isAuth=require('../midelwares/isAuth.js');
const {updateProfile,checkPassword,getvalidationCodeIntheEmail}=require('../controllers/profileController.js');
const router=express.Router();
router.put('/profile',isAuth,updateProfile);
router.post('/profile',isAuth,checkPassword);
router.post('/code_validation',isAuth,getvalidationCodeIntheEmail)

module.exports=router;