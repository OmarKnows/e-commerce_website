const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId, // req.user._id
    ref: "Vendor",
  },
  size: [
    // different sizes and each one could have different colours and prices
    {
      sizeName: String,
      price: Number,
      colour: [
        {
          colourName: String,
          image: String,
          quantity: Number,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
