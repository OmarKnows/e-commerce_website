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
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  vendorName: {
    type: String,
  },
  items: [
    // different sizes and each one could have different colours and prices
    {
      itemName: String,
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
