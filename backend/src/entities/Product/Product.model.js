const mongoose = require("mongoose");

// const reviewSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: {},
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    subcategory: [
      {
        type: String,
      },
    ],
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male",
  },
  description: {
    type: String,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
});

module.exports = mongoose.model("Product", productSchema);
