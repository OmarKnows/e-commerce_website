const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
  },
  subcategory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

module.exports = mongoose.model("Category", CategorySchema);
