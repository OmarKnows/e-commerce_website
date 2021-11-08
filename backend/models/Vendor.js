const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  products: {
    name: String,
    products: [
      //items model
    ],
  },
});

module.exports = mongoose.model("Vendor", vendorSchema);
