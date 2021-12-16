const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  email: {
    type: String,
    required: true,
  },
  userType: {
    // basic user, tailor or a vendor
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  tailorType: {
    // men or women
    type: String,
  },
  img: {},
  userOrders: {},
  userWishlist: {},
  vendorItems: [Object],
});

module.exports = mongoose.model("User", userSchema);
