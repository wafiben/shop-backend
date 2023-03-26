const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getProfile = async (req, res) => {
  try {
    res.status(200).json({ user: req.user })
  } catch (error) {
    console.log(error);
  }
}



const registerController = async (request, response) => {
  let userInfo = request.body;
  try {
    const searchedUser = await User.findOne({ email: userInfo.email });
    if (searchedUser) {
      return response
        .status(400)
        .json({ errors: [{ msg: "user already exists" }] });
    } else {
      const hashedPasword = await bcrypt.hash(userInfo.password, 10);
      const user = await new User({
        role: userInfo.role,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: hashedPasword,
        phone: userInfo.phone
      });
      console.log({ user })
      await user.save();
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
          role: user.role,
        },
        process.env.KEY
      );
      response.status(200).json({ user, token });
    }
  } catch (error) {
    response.status(500).json({ errors: [{ msg: "error server" }] });
  }
};
const loginController = async (request, response) => {
  //request
  const userInfo = request.body;
  try {
    //search for user
    const user = await User.findOne({ email: userInfo.email });
    if (!user) {
      return response
        .status(401)
        .json({ errors: [{ msg: "you must register before" }] });
    }
    //compare the passwordl of the user request with the password saved on the databse (searchedUser)
    const result = await bcrypt.compare(userInfo.password, user.password);
    if (!result) {
      return response
        .status(400)
        .json({ errors: [{ msg: "your passwordl is wrong" }] });
    }
    if (result == true) {
      const token = await jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          id: user._id,
        },
        process.env.KEY
      );
      response.status(200).json({ user, token });
    }
  } catch (error) {
    response.status(500).json({ message: "login failed" });
  }
};

module.exports = { registerController, loginController, getProfile };
