const express = require("express");
const router = express.Router();

const {
  getProduct,
  createProduct,
} = require("../controllers/productController");

router.get("/product", getProduct);
router.post("/product", createProduct);
/*  router.get("/person/:id", getProduct); */
/* 
router.delete("/person/:id", deleteProduct);
router.put("/person/:id", updateProduct);  */

module.exports = router;
