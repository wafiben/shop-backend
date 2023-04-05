const jwt = require("jsonwebtoken");
const User = require("../models/User");
const isAuth = async (request, response, next) => {
  try {
    const token = request.header("token");
    const verifyToken = await jwt.verify(token, process.env.KEY);
    if (!verifyToken) {
      return response.status(401).json({ message: "you are authorized" });
    }
    const user = await User.findById(verifyToken.id);
    request.user = user;
    next();
  } catch (error) {
    response.status(500).json({ msg: "error" });
  }
};
module.exports = isAuth;
