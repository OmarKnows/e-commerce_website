const router = require("express").Router(),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  mongoose = require("mongoose"),
  User = require("../models/User"),
  Tailor = require("../models/Tailor");

router.post("/register", async (req, res) => {
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
  else if (userType == "vendor") return res.json({ message: "hi from vendor" });
  else return res.status(404).send("Not Found");
});

router.post("/login", async (req, res) => {
  //user type
  const userType = req.body.type.toLowerCase();

  if (userType == "tailor") return tailorLogIn(req, res);
  else if (userType == "user") return userLogIn(req, res);
  else if (userType == "vendor") return res.json({ message: "hi from vendor" });
  else return res.status(404).send("Not Found");
});

// Helper functions
async function creatNewTailor(req, res, anyUserHashedPassword) {
  const { username, email, location } = req.body;
  const newTailor = new Tailor({
    username: username,
    password: anyUserHashedPassword,
    email: email,
    location: location,
  });
  try {
    const savedTailor = await newTailor.save();
    res.json({ NewUser: savedTailor._id });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function creatNewUser(req, res, anyUserHashedPassword) {
  const { username, email } = req.body;
  const newUser = new User({
    username: username,
    password: anyUserHashedPassword,
    email: email,
  });
  try {
    const savedUser = await newUser.save();
    res.json({ NewUser: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function tailorLogIn(req, res) {
  const foundTailor = await Tailor.findOne({ email: req.body.email });
  if (!foundTailor) return res.status(404).send("email not found");
  const validPass = await bcrypt.compare(
    req.body.password,
    foundTailor.password
  );
  if (!validPass) return res.status(404).send("passowrd didn't match");

  createToken(res, foundTailor._id); // assign a token for each user
}

async function userLogIn(req, res) {
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser) return res.status(404).send("email not found");
  const validPass = await bcrypt.compare(req.body.password, foundUser.password);
  if (!validPass) return res.status(404).send("passowrd didn't match");

  createToken(res, foundUser._id);
}

function createToken(res, userId) {
  const token = jwt.sign({ _id: userId }, process.env.Token_Secret);
  res.header("auth_token", token).send(token);
}

module.exports = router;
