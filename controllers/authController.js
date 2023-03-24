const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerController = async (request, response) => {
  console.log("there");
  let user = request.body;
  try {
    const searchedUser = await User.findOne({ email: user.email });
    if (searchedUser) {
      return response
        .status(400)
        .json({ errors: [{ msg: "user already exists" }] });
    } else {
      const hashedPasword = await bcrypt.hash(user.password, 10);
      const newUser = await new User({
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPasword,
      });
      await newUser.save();
      const token = jwt.sign(
        {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          id: newUser._id,
          role: newUser.role,
        },
        process.env.KEY
      );
      console.log("token", token);
      response.status(200).json({ newUser, token });
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

module.exports = { registerController, loginController };
