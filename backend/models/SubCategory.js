const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  category: {
    // Ready made, Accessories, Cloth
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
});

module.exports = mongoose.model("SubCategory", subSchema);
