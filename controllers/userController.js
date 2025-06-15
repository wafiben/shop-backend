const User = require("../models/User");

const getAllCompany = async (req, res) => {
  try {
    const companies = await User.find({ role: ["company"] }).select(
      "-products"
    );
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ msg: "failed to get companies" });
  }
};
const getOneCompany = async (req, res) => {
  try {
    const company = await User.findById(req.params.id).populate("products");
    res.status(200).json({ company });
  } catch (error) {
    res.status(500).json({ msg: "get company failed" });
  }
};

module.exports = { getAllCompany, getOneCompany };
