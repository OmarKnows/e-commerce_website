const bcrypt = require("bcrypt");
const User = require("../User/User.model");
const Token = require("../../utils/emails/tempToken.model");
const crypto = require("crypto");
const sendEmail = require("../../utils/emails/sendEmail");
const jwt = require("jsonwebtoken");
const {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} = require("../../utils/userValidationAndVerification/joiValidation");

exports.signUp = async (req, res, next) => {
  try {
    const { error } = userRegisterValidationSchema(req.body); // validating body based on type
    if (error) return next(error.details[0]);

    //hashing password
    const UserHashedPassword = await hashing(req.body.password);

    return creatNewUser(req, res, next, UserHashedPassword);
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { error } = userLoginValidationSchema(req.body);
    if (error) return next(error.details[0]); // ===> error when username, email, password not meet with validation schema

    return userLogIn(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.forgetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("User does not exist");
    let token = await Token.findOne({ userId: user._id });
    if (token) {
      await token.deleteOne();
    }
    createResetTokenLink(res, user.email, user._id, next);
  } catch (err) {
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const Mongoose = require("mongoose");
    const userId = Mongoose.Types.ObjectId(req.body.userId);
    let passwordResetToken = await Token.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(
      req.body.token,
      passwordResetToken.token
    );
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }

    //hashing password
    const hash = await hashing(req.body.password);

    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: req.body.userId });
    await passwordResetToken.deleteOne();
    // send email
    await sendEmail(
      user.email,
      "Password Reset Successfully ✔",
      `<h1> Hi ${user.username}, your password is successfully updated`
    );
    res.json("Password Updated");
  } catch (err) {
    next(err);
  }
};

const creatNewUser = async (req, res, next, UserHashedPassword) => {
  const { username, email, userType, location, phone, description } = req.body;
  try {
    const alreadyExist = await User.findOne({ email: email }); // user already exists
    if (alreadyExist) throw new Error("This user already Exists");

    const newUser = new User({
      username,
      password: UserHashedPassword,
      userType,
      email,
      location,
      phone,
      description,
    });

    const savedUser = await newUser.save();
    await sendEmail(
      email,
      "Welcome To Ebra w Fatla Website",
      `<h3>Thank you ${savedUser.username}, for joining us</h3>`
    );
    res.json({ NewUser: savedUser._id, username: username });
  } catch (err) {
    next(err);
  }
};

// user login
const userLogIn = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) throw new Error("User email notttt found");
    const validPass = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validPass) throw new Error("passowrd didn't match");
    createToken(res, foundUser._id, foundUser.username, foundUser.userType); // assign a token for each user
  } catch (err) {
    next(err);
  }
};

const createResetTokenLink = async (res, email, id, next) => {
  try {
    let resetToken = crypto.randomBytes(32).toString("hex");

    // hashing token
    const hash = await hashing(resetToken);

    await new Token({
      userId: id,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `http://localhost:3000/reset/${resetToken}`;
    await sendEmail(
      email,
      "Password Reset Request",
      `Your Password Reset Link -> ${link}`
    );
    res.json("email sent");
  } catch (err) {
    next(err);
  }
};

// creating login token
function createToken(res, userId, username, userType) {
  const token = jwt.sign(
    { _id: userId, username, userType },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token: token });
}

async function hashing(plainText) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(plainText, salt);
  return hash;
}
