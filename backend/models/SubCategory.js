const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("SubCategory", subSchema);
