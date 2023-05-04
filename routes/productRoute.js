const express=require("express");
const router=express.Router();
const {
	getProduct,
	createProduct,
	modifyProduct,
	getProductsOfCompany,
	getProductsOfSpeceficCompany,
	handleShowProduct,
	deleteUserProduct
}=require("../controllers/productController");
const {isCompany,isClient}=require("../midelwares/role");
const isAuth=require('../midelwares/isAuth')
const upload=require("../midelwares/upload");
router.get("/product",getProduct);
router.post("/product",upload.single("SelectedFile"),isAuth,createProduct);
router.delete("/company-products/:id",isAuth,deleteUserProduct);
router.put("/product/:id",upload.single("SelectedFile"),isAuth,isCompany,modifyProduct);
router.get("/company-products",isAuth,getProductsOfCompany);//myposts
router.get("/product_user_company/:id",isAuth,isClient,getProductsOfSpeceficCompany);
router.put('/show/:id',isAuth,isCompany,handleShowProduct)

module.exports=router;
