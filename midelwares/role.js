const isAdmin = (req, res, next) => {
  try {
    if (req.user.role[0] === "admin") {
      next();
    } else {
      res.status(400).json({ msg: " not authorized" });
    }
  } catch (error) {
    res.status(500).json({ msg: "error" });
  }
};

const isClient = (req, res, next) => {
  try {
    if (req.user.role[0] === "client") {
      next();
    } else {
      res
        .status(400)
        .json({ msg: " not authorized ,only authorized for client" });
    }
  } catch (error) {
    res.status(500).json({ msg: "failed" });
  }
};

const isCompany = async (req, res, next) => {
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
