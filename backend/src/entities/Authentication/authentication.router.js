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
  createResetTokenLink,
} = require("../../../controllers/authHelperFunctions"); // importing auth controllers

const User = require("../User/User.model");
const Tailor = require("../Tailor/Tailor.model");
const Vendor = require("../Vendor/Vendor.model");
const Token = require("../../utils/emails/tempToken.model");

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

router.post("/forget-password-request", async (req, res, next) => {
  try {
    const { type, email } = req.body;
    if (type === "user") {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User does not exist");
      let token = await Token.findOne({ userId: user._id });
      if (token) {
        await token.deleteOne();
      }
      createResetTokenLink(res, user.email, user._id, type, next);
    }
    if (type === "tailor") {
      const tailor = await Tailor.findOne({ email });
      if (!tailor) throw new Error("Tailor does not exist");
      let token = await Token.findOne({ userId: tailor._id });
      if (token) {
        await token.deleteOne();
      }
      createResetTokenLink(res, tailor.email, tailor._id, type, next);
    }
    if (type === "vendor") {
      const vendor = await Vendor.findOne({ email });
      if (!vendor) throw new Error("Vendor does not exist");
      let token = await Token.findOne({ userId: vendor._id });
      if (token) {
        await token.deleteOne();
      }
      createResetTokenLink(res, vendor.email, vendor._id, type, next);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
