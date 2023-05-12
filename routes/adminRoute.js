const express=require('express');
const {getAllCompanies,getAllClients,banClient,banCompany}=require('../controllers/adminController');
const {isAdmin}=require('../midelwares/role');
const isAuth=require('../midelwares/isAuth')
const router=express.Router();
router.get('/admin_companies',isAuth,isAdmin,getAllCompanies);
router.get('/admin_clients',isAuth,isAdmin,getAllClients);
router.put('/admin_clients/:id',isAuth,isAdmin,banClient);
router.put('/admin_companies/:id',isAuth,isAdmin,banCompany);
module.exports=router