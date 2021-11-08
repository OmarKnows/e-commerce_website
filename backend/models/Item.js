const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  gender: {
    type: String,
  },
  description: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
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

module.exports = mongoose.model("Item", itemSchema);
