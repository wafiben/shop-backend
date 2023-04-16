const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  nameProduct: { type: String, required: true },
  price: { type: Number, required: true },
  unitType: { type: String, required: true },
  quantity: { type: Number, required: true },
  SelectedFile: {
    type: String,
  },
  user: {
    type: String,
  },
  show: {
    type: Boolean,
    required: true,
    default: false
  }
});
module.exports = mongoose.model("product", productSchema);
