const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },

  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
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
