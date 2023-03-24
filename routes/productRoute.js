const express = require("express");
const router = express.Router();
const {
  getProduct,
  createProduct,
  deleteProdect,
  modifyProduct,
} = require("../controllers/productController");
const upload = require("../midelwares/upload");

router.get("/product", getProduct);
router.post("/product", upload.single("SelectedFile"), createProduct);
router.delete("/product/:id", deleteProdect);
router.put("/product/:id", modifyProduct);

module.exports = router;
