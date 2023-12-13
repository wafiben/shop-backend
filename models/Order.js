const mongoose = require("mongoose");
const productSchema = require("./product.js");

const orderSchema = mongoose.Schema(
  {
    products: [mongoose.Schema.Types.Mixed],
    clientId: { type: mongoose.Schema.Types.ObjectId, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: ["draft", "confirmed", "shipped", "completed"],
      default: "draft",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
