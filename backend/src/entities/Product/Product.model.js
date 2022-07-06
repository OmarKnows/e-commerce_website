const mongoose = require('mongoose')

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
  },
  rating: {
    type: Number,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    default: 'Male',
  },
  description: {
    type: String,
  },
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  img: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },

  // different colors with different sizes and each size has different qty
  colors: {},
})

module.exports = mongoose.model('Product', productSchema)

// sizes: [
//
//   {
//     sizeName: String,
//     color: [
//       {
//         colorName: String,
//         image: String,
//         quantity: Number,
//       },
//     ],
//   },
// ],
