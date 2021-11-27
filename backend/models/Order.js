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

/* 
const OrderSchema = new mongoose.Schema({
  ownerId: { type: Schema.Types.ObjectId },
  products: [
    {
      productID: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
});


*/
