const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: {},
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

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
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0,
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
  sizes: [
    // different sizes and each one could have different colours and prices
    {
      sizeName: String,
      price: Number,
      color: [
        {
          colorName: String,
          image: String,
          quantity: Number,
        },
      ],
    },
  ],
  productImage: [
    {
      type: String,
      required: true,
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
