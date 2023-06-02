const express=require("express");
const isAuth=require('../midelwares/isAuth.js');
const {updateProfile,checkPassword,getvalidationCodeIntheEmail,checkValidationCode}=require('../controllers/profileController.js');
const router=express.Router();
router.put('/profile',isAuth,updateProfile);
router.post('/profile',isAuth,checkPassword);
router.post('/code_validation',getvalidationCodeIntheEmail);
router.post('/validation',checkValidationCode)

module.exports=router;