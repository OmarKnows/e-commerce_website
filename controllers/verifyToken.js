const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth_token");
  if (!token) return next(new Error("Please log in"));

  try {
    const verifiedUser = jwt.verify(token, process.env.Token_Secret);
    req.user = verifiedUser;
    next();
  } catch (err) {
    next(new Error("Invalid Token"));
  }
};
