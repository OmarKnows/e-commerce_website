const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} = require("../../../controllers/joiValidation");

const {
  creatNewTailor,
  creatNewUser,
  creatNewVendor,
  tailorLogIn,
  userLogIn,
  vendorLogIn,
} = require("../../../controllers/authHelperFunctions"); // importing auth controllers

router.post("/register", async (req, res, next) => {
  try {
    const { error } = userRegisterValidationSchema(req.body); // validating body based on type
    if (error) return next(error.details[0]);

    //hashing password
    const PlainPassword = req.body.password,
      saltRounds = 10,
      salt = await bcrypt.genSalt(saltRounds),
      anyUserHashedPassword = await bcrypt.hash(PlainPassword, salt);

    //user type
    const userType = req.body.type;

    if (userType === "tailor") {
      return creatNewTailor(req, res, next, anyUserHashedPassword);
    } else if (userType === "user") {
      return creatNewUser(req, res, next, anyUserHashedPassword);
    } else if (userType === "vendor") {
      return creatNewVendor(req, res, next, anyUserHashedPassword);
    } else return next();
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { error } = userLoginValidationSchema(req.body);
    if (error) return next(error.details[0]); // ===> error when username, email, password not meet with validation schema

    // user type
    const userType = req.body.type;

    if (userType === "tailor") return tailorLogIn(req, res, next);
    else if (userType === "user") return userLogIn(req, res, next);
    else if (userType === "vendor") return vendorLogIn(req, res, next);
    else return next();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
