const mongoose = require("mongoose");

const tailorSchema = new mongoose.Schema({
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
  },
});

module.exports = mongoose.model("Tailor", tailorSchema);
