const {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} = require("../../utils/userValidationAndVerification/joiValidation");
const bcrypt = require("bcrypt");
const User = require("../User/User.model");
const Token = require("../../utils/emails/tempToken.model");

exports.signUp = async (req, res, next) => {
  try {
    const { error } = userRegisterValidationSchema(req.body); // validating body based on type
    if (error) return next(error.details[0]);

    //hashing password
    const PlainPassword = req.body.password,
      saltRounds = 10,
      salt = await bcrypt.genSalt(saltRounds),
      UserHashedPassword = await bcrypt.hash(PlainPassword, salt);

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

// sign up
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

const createResetTokenLink = async (res, email, id, type, next) => {
  try {
    let resetToken = crypto.randomBytes(32).toString("hex");
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    hash = await bcrypt.hash(resetToken, salt);
    await new Token({
      userId: id,
      usertType: type,
      token: hash,
      createdAt: Date.now(),
    }).save();

    const link = `http://localhost:3000/reset/${resetToken}`;
    await sendEmail(email, "Password Reset Request", link);
    res.json("email sent");
  } catch (err) {
    next(err);
  }
};

// creating user token
function createToken(res, userId, username, userType) {
  const token = jwt.sign(
    { _id: userId, username, userType },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token: token });
}
