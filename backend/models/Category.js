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

// delete related subcategories & products
CategorySchema.post("remove", async (doc) => {
  const SubCategory = require("./SubCategory");
  const Product = require("./Product");

  const subs = await SubCategory.find({ _id: { $in: doc.subcategory } });

  // no need to check products if there is no sub categories
  if (subs.length !== 0) {
    // delete products in each sub category
    subs.forEach(async (sub) => {
      await Product.deleteMany({ _id: { $in: sub.products } });
    });
    // delete subcategories
    await SubCategory.deleteMany({ _id: { $in: doc.subcategory } });
  }
});

module.exports = mongoose.model("Category", CategorySchema);
