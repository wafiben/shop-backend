const OrderModel = require("../models/Order");
const { ObjectId } = require("mongodb");

const makeOrderAsDraft = async (req, res) => {
  const clientId = req.user._id;

  try {
    const { products, idOfCompany } = req.body;
    const newObjectIdCompany = new ObjectId(idOfCompany);
    console.log(idOfCompany, clientId);

    // Create a new order document
    const newOrder = new OrderModel({
      products,
      clientId: clientId,
      companyId: newObjectIdCompany,
      status: "draft", // You can customize the status based on your requirements
    });

    await newOrder.save();
    return res
      .status(201)
      .json({ message: "Order created as draft", order: newOrder });
  } catch (error) {
    console.error("Error creating draft order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { makeOrderAsDraft };
