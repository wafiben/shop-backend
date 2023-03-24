const isAdmin = (req, res, next) => {
  try {
    if (req.user.role[0] === "admin") {
      next();
    }
    res.status(400).json({ msg: " not authorized" });
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};
const isClient = (req, res, next) => {
  try {
    if (req.user.role === "client") {
      next();
    }
    res.status(400).json({ msg: " not authorized" });
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};
const isCompany = (req, res, next) => {
  try {
    if (req.user.role[0] === "company") {
      next();
    } else {
      res.status(400).json({ msg: " not authorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

module.exports = { isAdmin, isClient, isCompany };
