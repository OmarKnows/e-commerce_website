const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  vendorName: {
    type: String,
    required: true,
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
