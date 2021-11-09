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

// delete related subcategories
CategorySchema.post("remove", async (doc) => {
  const SubCategory = require("./SubCategory");
  const Product = require("./Product");

  const subs = await SubCategory.find({ _id: { $in: doc.subcategory } });
  console.log(subs);
  console.log(subs.products);
  subs.forEach(async (sub) => {
    const deletedProduct = await Product.deleteMany({
      _id: { $in: sub.products },
    });
    console.log(deletedProduct);
  });

  await SubCategory.deleteMany({ _id: { $in: doc.subcategory } });
});

module.exports = mongoose.model("Category", CategorySchema);
