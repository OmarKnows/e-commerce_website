const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },

  // simple user, tailor or a vendor
  userType: {
    type: String,
    required: true,
  },

  // simple user
  userOrders: [Object],
  userWishlist: [Object],

  // user as a tailor
  tailorType: {
    // men or women
    type: String,
  },

  // user as a vendor
  vendorItems: [Object],

  location: {
    type: String,
  },

  description: {
    type: String,
  },
});

// hashing password
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hashSync(this.password, salt);
});

UserSchema.methods.comparePass = async function (userPass) {
  const isMatch = await bcrypt.compare(userPass, this.password);
  return isMatch;
};

UserSchema.methods.CreateJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

module.exports = mongoose.model("User", userSchema);
