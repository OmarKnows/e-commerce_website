const jwt = require("jsonwebtoken");

module.exports = {
  verifyToken: (req, res, next) => {
    const token = req.header("auth_token");
    if (!token) return next(new Error("Please log in"));

    try {
      const verifiedUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = verifiedUser;
      next();
    } catch (err) {
      next(new Error("Invalid Token"));
    }
  },
  verifyVendor: (req, res, next) => {
    if (req.user.type !== "vendor")
      return next(new Error("Please sign up as a vendor"));
    next();
  },
};
