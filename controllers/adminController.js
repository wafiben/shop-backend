const User = require("../models/User");
const Message = require("../models/Message");
const nodemailer = require("nodemailer");

const getAllCompanies = async (req, res) => {
  try {
    const users = await User.find({ role: ["company"] }).select(
      "-password -products"
    );
    if (users.length !== 0) {
      return res.status(200).json({ users });
    } else {
      return res.status(404).json({ msg: "no company exist yet" });
    }
  } catch (error) {
    throw new Error("Erro server");
  }
};

const getBannedCompanies = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { ban: true }, // select users where ban is not true (i.e., false or undefined)
        { role: ["company"] }, // select users where role is 'client'
      ],
    }).select("-password -products");

    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ msg: "failed  banned to get companies" });
  }
};

const getActivatedCompanies = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { ban: false }, // select users where ban is not true (i.e., false or undefined)
        { role: ["company"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    return res.status(200).json({ users });
  } catch (error) {
    throw new Error("server Error");
  }
};

const getAllClients = async (req, res) => {
  try {
    const users = await User.find({ role: ["client"] }).select(
      "-password -products"
    );
    const activatedUser = await User.find({
      $and: [
        { ban: { $ne: true } }, // select users where ban is not true (i.e., false or undefined)
        { role: ["client"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    const bannedUser = await User.find({
      $and: [
        { ban: { $ne: false } }, // select users where ban is not true (i.e., false or undefined)
        { role: ["client"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    if (users.length !== 0) {
      return res.status(200).json({ users, activatedUser, bannedUser });
    } else {
      return res.status(404).json({ msg: "no client exist yet" });
    }
  } catch (error) {
    res.status(500).json({ msg: "get client is failed" });
  }
};

const banClient = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.ban = !user.ban;
    await user.save();
    const users = await User.find({ role: ["client"] }).select(
      "-password -products"
    );
    const activatedUser = await User.find({
      $and: [
        { ban: { $ne: true } }, // select users where ban is not true (i.e., false or undefined)
        { role: ["client"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    const bannedUser = await User.find({
      $and: [
        { ban: { $ne: false } }, // select users where ban is not true (i.e., false or undefined)
        { role: ["client"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    res.status(200).json({ users, activatedUser, bannedUser });
  } catch (error) {
    res.status(500).json({ msg: "ban user client is feild" });
  }
};

const banCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.ban = !user.ban;
    await user.save();
    const companies = await User.find({ role: ["company"] }).select(
      "-password -products"
    );

    const activatedUser = await User.find({
      $and: [
        { ban: { $ne: true } }, // select users where ban is not true (i.e., false or undefined)
        { role: ["company"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    const bannedUser = await User.find({
      $and: [
        { ban: { $ne: false } }, // select users where ban is not true (i.e., false or undefined)
        { role: ["company"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    res.status(200).json({ users: companies, activatedUser, bannedUser });
  } catch (error) {
    res.status(500).json({ msg: "ban user company is feild" });
  }
};

const sendMessagetoTheAdmin = async (req, res) => {
  const { name, email, subject, content } = req.body;
  try {
    const newMessage = new Message({ name, email, content, subject });
    const mailOptions = {
      from: "wafibnjd@gmail.com", // Replace with the sender email address
      to: email,
      subject: "Service client response",
      html: `<h2>We will contact you as soon as possible</h2>`,
    };
    const transporter = nodemailer.createTransport({
      host: "wafibnjd@gmail.com",
      service: "gmail",
      auth: {
        user: "wafibnjd@gmail.com", // Replace with your email address
        pass: "iilyhkrmdnblzrlj", // Replace with your email password
      },
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
    });
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.status(404).json({ msg: "failed to send email" });
      } else {
        await newMessage.save();
        return res
          .status(200)
          .json({ msg: "message is sucessfully sended to the service client" });
      }
    });
  } catch (e) {
    res.status(500).json({ msg: "send  message is failed" });
  }
};

const sendMessage = async (req, res) => {
  const { name, email, subject, content } = req.body;
  try {
    const newMessage = new Message({ name, email, content, subject });
    await newMessage.save();
    res.status(200).json({ msg: "message is ssucessfully sended" });
  } catch (error) {
    res.status(500).json({ msg: "send  message is failed" });
  }
};
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ msg: "send  message is failed" });
  }
};
const getLengthTableCompany = async (req, res) => {
  try {
    const companyBannedCount = await User.countDocuments({
      role: "company",
      ban: true,
    }).exec();
    const allCompaniesCount = await User.countDocuments({
      role: "company",
    }).exec();
    const activatedCompaniesCount = await User.countDocuments({
      role: "company",
      ban: false,
    }).exec();
    res.status(200).json({
      companyBannedCount,
      allCompaniesCount,
      activatedCompaniesCount,
    });
  } catch (e) {
    throw new Error("error server");
  }
};
const getLengthTableClient = async (req, res) => {
  try {
    const clientBannedCount = await User.countDocuments({
      role: "client",
      ban: true,
    }).exec();
    const allClientsCount = await User.countDocuments({
      role: "client",
    }).exec();
    const activatedClientsCount = await User.countDocuments({
      role: "client",
      ban: false,
    }).exec();
    res.status(200).json({
      clientBannedCount,
      allClientsCount,
      activatedClientsCount,
    });
  } catch (e) {
    throw new Error("error server");
  }
};
const getBannedClients = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { ban: true }, // select users where ban is not true (i.e., false or undefined)
        { role: ["client"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    return res.status(200).json({ users });
  } catch (error) {
    throw new Error("error server");
  }
};
const getVerifClients = async (req, res) => {
  try {
    const users = await User.find({
      $and: [
        { ban: false }, // select users where ban is not true (i.e., false or undefined)
        { role: ["client"] }, // select users where role is 'client'
      ],
    }).select("-password -products");
    return res.status(200).json({ users });
  } catch (error) {
    throw new Error("error server");
  }
};
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await Message.findByIdAndDelete(id);
    return res.status(200).json(true);
  } catch (error) {
    throw new Error("error server");
  }
};

module.exports = {
  getBannedCompanies,
  getAllCompanies,
  getActivatedCompanies,
  getLengthTableCompany,
  getAllClients,
  banClient,
  banCompany,
  sendMessagetoTheAdmin,
  sendMessage,
  getMessages,
  getLengthTableClient,
  getBannedClients,
  getVerifClients,
  deleteMessage,
};
