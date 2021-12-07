const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId },
      size: String,
      colour: String,
      quantity: Number,
      price: Number,
    },
  ],
});

module.exports = mongoose.model("Order", OrderSchema);
