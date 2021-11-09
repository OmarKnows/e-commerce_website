const mongoose = require("mongoose");
const Product = require("./Product");

const subSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

// delete related products
subSchema.post("remove", async (doc) => {
  console.log(
    "hi from remove Sub Category hoook to remove all related products"
  );
  await Product.deleteMany({ _id: { $in: doc.products } });
});

module.exports = mongoose.model("SubCategory", subSchema);
