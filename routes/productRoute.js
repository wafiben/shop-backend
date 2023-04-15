const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  deleteProdect,
  modifyProduct,
  getProductsOfCompany,
  getProductsOfSpeceficCompany
} = require("../controllers/productController");
const { isCompany, isClient } = require("../midelwares/role");
const isAuth = require('../midelwares/isAuth')
const upload = require("../midelwares/upload");

router.get("/product", getProduct);
router.post("/product", upload.single("SelectedFile"), isAuth, isCompany, createProduct);
router.delete("/product/:id", deleteProdect);
router.put("/product/:id", upload.single("SelectedFile"), isAuth, isCompany, modifyProduct);
router.get("/productscompany", isAuth, isCompany, getProductsOfCompany);//myposts
router.get("/product_user_company/:id", isAuth, isClient, getProductsOfSpeceficCompany);
module.exports = router;
