const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("SubCategory", subSchema);
