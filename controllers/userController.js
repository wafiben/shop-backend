const User = require("../models/User");
const getUser = async (req, res) => {
  const { letter, id } = req.query;
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
  }
};

module.exports = { getUser };
