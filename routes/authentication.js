const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Tailor = require("../models/Tailor");
const {
  userLoginValidationSchema,
  userRegisterValidationSchema,
} = require("../models/joiValidation");

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
      res.json({ message: "hi from vendor" });
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
    else if (userType === "vendor")
      return res.json({ message: "hi from vendor" });
    else return next();
  } catch (err) {
    next(err);
  }
});

// Helper functions
async function creatNewTailor(req, res, next, anyUserHashedPassword) {
  const { username, email, location, phone, description, tailorType } =
    req.body;
  try {
    const alreadyExist = await Tailor.findOne({ email: email }); // user already exists
    if (alreadyExist) throw new Error("This tailor already Exists");

    const newTailor = new Tailor({
      username: username,
      password: anyUserHashedPassword,
      email: email,
      location: location,
      tailorType: tailorType,
      phone: phone,
      description: description,
    });
    const savedTailor = await newTailor.save();
    res.json({ NewUser: savedTailor._id, username: username });
  } catch (err) {
    next(err);
  }
}

async function creatNewUser(req, res, next, anyUserHashedPassword) {
  const { username, email } = req.body;
  try {
    const alreadyExist = await User.findOne({ email: email });
    if (alreadyExist) throw new Error("This user already Exists");

    const newUser = new User({
      username: username,
      password: anyUserHashedPassword,
      email: email,
    });

    const savedUser = await newUser.save();
    res.json({ NewUser: savedUser._id, username: username });
  } catch (err) {
    next(err);
  }
}

async function tailorLogIn(req, res, next) {
  try {
    const foundTailor = await Tailor.findOne({ email: req.body.email });
    if (!foundTailor) throw new Error("tailor email notttt found");
    const validPass = await bcrypt.compare(
      req.body.password,
      foundTailor.password
    );
    if (!validPass) throw new Error("passowrd didn't match");
    createToken(res, foundTailor._id, foundTailor.username, req.body.type); // assign a token for each user
  } catch (err) {
    next(err);
  }
}

async function userLogIn(req, res, next) {
  try {
    const foundUser = await User.findOne({ email: req.body.email });

    if (!foundUser) throw new Error("user email notttt found");
    const validPass = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validPass) throw new Error("passowrd didn't match");
    createToken(res, foundUser._id, foundUser.username, req.body.type); // assign a token for each user
  } catch (err) {
    next(err);
  }
}

function createToken(res, userId, username, type) {
  const token = jwt.sign(
    { _id: userId, username: username, type: type },
    process.env.Token_Secret,
    { expiresIn: "1h" }
  );
  res.json({ token: token });
}

module.exports = router;
