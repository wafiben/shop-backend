const User = require("../models/User");
const getAllCompany = async (req, res) => {
  try {
    const companies = await User.find({ role: ['company'] }).select('-products')
    res.status(200).json({ companies })
  } catch (error) {
    res.status(500).json({ msg: "failed to get companies" })
  }
};
const getOneCompany = async (req, res) => {
  try {
    const company = await User.findById(req.params.id).populate('products');
    res.status(200).json({ company })
  } catch (error) {
    res.status(500).json({ msg: "get company failed" })
  }
}
module.exports = { getAllCompany, getOneCompany };







/* const { letter, id } = req.query;
  try {
    const users = await User.find();
    if (letter) {
      const searchedUsers = products.filter((elt) =>
        elt.nameProduct.toLowerCase().includes(letter.toLowerCase())
      );
      if (searchedUsers.length === 0) {
        res.status(400).json({ msg: "no Company with this name" });
      } else {
        res.status(200).json({ users: searchedUsers });
      }
    } else if (id) {
      const foundUser = await User.findById(id);
      res.status(200).json({ users: foundUser });
    } else {
      const usersSorted = users.sort((elt) => elt.country);
      res.status(200).json({ users });
    }
  } catch (error) {
    res.status(500).json({ msg: "operationof gettAllPersons is failed" });
  } */
