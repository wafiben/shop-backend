const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  deleteProdect,
  modifyProduct,
  getPostsOfUser
} = require("../controllers/productController");
const { isCompany } = require('../midelwares/role');
const isAuth = require('../midelwares/isAuth')
const upload = require("../midelwares/upload");

router.get("/product", getProduct);
router.post("/product", upload.single("SelectedFile"), isAuth, isCompany, createProduct);
router.delete("/product/:id", deleteProdect);
router.put("/product/:id", modifyProduct);
router.get("/product-company", isAuth, getPostsOfUser);

module.exports = router;
