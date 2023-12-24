const OrderModel = require("../models/Order");
const {
  sendNotificationToClient,
  sendNotificationToCompany,
} = require("../helpers/notification");

const { ObjectId } = require("mongodb");

const makeOrderAsDraft = async (req, res) => {
  const clientId = req.user._id;
  try {
    const { products, idOfCompany } = req.body;
    const newObjectIdCompany = new ObjectId(idOfCompany);
    await sendNotificationToClient(
      clientId,
      "Order",
      "Order has been sucessfylly sent"
    );
    await sendNotificationToCompany(
      newObjectIdCompany,
      "Order",
      "Order recieved"
    );
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
                                                                                                  
const getListOrderOFclient = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      user: { $eq: req.user._id.toString() },
    });
    res.status(200).json({ orders });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getListOrderOFCompany = (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  makeOrderAsDraft,
  getListOrderOFCompany,
  getListOrderOFclient,
};
