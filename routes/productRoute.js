const express = require("express");
const router = express.Router();

const {
  getProduct,
  createProduct,
} = require("../controllers/productController");
const upload = require("../midelwares/upload");

router.get("/product", getProduct);
router.post("/product", upload.single("SelectedFile"), createProduct);

module.exports = router;
