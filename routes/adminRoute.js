const express=require("express");
const {

	getAllClients,
	banClient,
	banCompany,
	sendMessagetoTheAdmin,
	sendMessage,
	getMessages,

	getAllCompanies,
	getBannedCompanies,
	getActivatedCompanies,
	getLengthTableCompany,
	getLengthTableClient
}=require("../controllers/adminController");
const {isAdmin}=require("../midelwares/role");
const isAuth=require("../midelwares/isAuth");
const router=express.Router();

//companies
router.get("/admin_all_companies",isAuth,isAdmin,getAllCompanies);
router.get("/admin_companies_ban",isAuth,isAdmin,getBannedCompanies);
router.get("/admin_companies_verif",isAuth,isAdmin,getActivatedCompanies);
//companies
//clients
router.get("/admin_clients",isAuth,isAdmin,getAllClients);
router.put("/admin_clients/:id",isAuth,isAdmin,banClient);
router.put("/admin_companies/:id",isAuth,isAdmin,banCompany);

router.get('/info_table_length_company',isAuth,isAdmin,getLengthTableCompany);
router.get('/info_table_length_client',isAuth,isAdmin,getLengthTableClient)
/*router.post('/admin_message',sendMessagetoTheAdmin);*/
router.post("/admin_message",sendMessage);
router.get("/admin_message",isAuth,isAdmin,getMessages);
module.exports=router;
