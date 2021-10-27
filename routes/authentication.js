const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  mongoose = require("mongoose"),
  User = require("../models/User"),
  Tailor = require("../models/Tailor"),
  {
    userLoginValidationSchema,
    userRegisterValidationSchema,
  } = require("../models/joiValidation");

router.post("/register", async (req, res) => {
  // Validating any user registration based on his username, email and password
  const { username, email, password } = req.body;
  try {
    const { error } = userRegisterValidationSchema({
      username: username,
      email: email,
      password: password,
    });
    if (error) throw error.details[0].message;
    //hashing
    const PlainPassword = req.body.password,
      saltRounds = 10,
      salt = await bcrypt.genSalt(saltRounds),
      anyUserHashedPassword = await bcrypt.hash(PlainPassword, salt);

    //user type
    const userType = req.body.type.toLowerCase();
    if (userType == "tailor")
      return creatNewTailor(req, res, anyUserHashedPassword);
    else if (userType == "user")
      return creatNewUser(req, res, anyUserHashedPassword);
    else if (userType == "vendor") res.json({ message: "hi from vendor" });
    else {
      const error = new Error("Page Not Found");
      error.code = "404";
      throw error;
    }
  } catch (err) {
    res.status(err.code || 400).send(err.message || err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { error } = userLoginValidationSchema({
    email: email,
    password: password,
  });

  //user type
  const userType = req.body.type.toLowerCase();
  try {
    if (error) throw error.details[0].message;

    if (userType == "tailor") return tailorLogIn(req, res);
    else if (userType == "user") return userLogIn(req, res);
    else if (userType == "vendor")
      return res.json({ message: "hi from vendor" });
    else {
      const error = new Error("Page Not Found");
      error.code = "404";
      throw error;
    }
  } catch (err) {
    res.status(err.code || 400).send(err.message || err);
  }
});

// Helper functions
async function creatNewTailor(req, res, anyUserHashedPassword) {
  const alreadyExist = await Tailor.findOne({ email: req.body.email });
  try {
    if (alreadyExist) throw "This tailor already Exists";
    const { username, email, location } = req.body;
    const newTailor = new Tailor({
      username: username,
      password: anyUserHashedPassword,
      email: email,
      location: location,
    });
    const savedTailor = await newTailor.save();
    res.json({ NewUser: savedTailor._id });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function creatNewUser(req, res, anyUserHashedPassword) {
  const alreadyExist = await User.findOne({ email: req.body.email });
  try {
    if (alreadyExist) throw "This user already Exists";
    const { username, email } = req.body;
    const newUser = new User({
      username: username,
      password: anyUserHashedPassword,
      email: email,
    });

    const savedUser = await newUser.save();
    res.json({ NewUser: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function tailorLogIn(req, res) {
  const foundTailor = await Tailor.findOne({ email: req.body.email });
  try {
    if (!foundTailor) throw "email not found";
    const validPass = await bcrypt.compare(
      req.body.password,
      foundTailor.password
    );
    if (!validPass) throw "passowrd didn't match";
    createToken(res, foundTailor._id); // assign a token for each user
  } catch (err) {
    res.status(400).send(err);
  }
}

async function userLogIn(req, res) {
  const foundUser = await User.findOne({ email: req.body.email });
  try {
    if (!foundUser) throw "email not found";
    const validPass = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validPass) throw "passowrd didn't match";
    createToken(res, foundUser._id); // assign a token for each user
  } catch (err) {
    res.status(400).send(err);
  }
}

function createToken(res, userId) {
  const token = jwt.sign({ _id: userId }, process.env.Token_Secret);
  res.header("auth_token", token).send(token);
}

module.exports = router;
