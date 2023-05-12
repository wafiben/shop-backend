const express=require('express');
const {getAllCompanies,getAllClients}=require('../controllers/adminController');
const {isAdmin}=require('../midelwares/role');
const isAuth=require('../midelwares/isAuth')
const router=express.Router();
router.get('/admin_companies',isAuth,isAdmin,getAllCompanies);
router.get('/admin_clients',isAuth,isAdmin,getAllClients);
module.exports=router