const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema({
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
  description: {
    type: String,
  },
  tailorType: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Tailor", tailorSchema);
