const router = require("express").Router({ mergeParams: true });
const Product = require("../models/Product");
const verify = require("../controllers/verifyToken");
const SubCategory = require("../models/SubCategory");

//Add New Product
router.post("/", async (req, res, next) => {
  try {
    const subcategory = await SubCategory.findById(req.params.subId);
    if (!subcategory) throw new Error("SubCategory Not Found");

    const { name, gender, descripton, owner, size } = req.body;

    const newProduct = new Product({
      name: name,
      gender: gender,
      descripton: descripton,
      owner: owner,
      size: size,
    });
    const savedProduct = await newProduct.save();
    subcategory.products.push(savedProduct);
    await subcategory.save();

    res.json(savedProduct);
  } catch (err) {
    next(err);
  }
});

//Get all products in a subcategory
router.get("/", async (req, res, next) => {
  try {
    const subcategory = await SubCategory.findById(req.params.subId)
      .populate("products")
      .exec();
    res.json(subcategory.products);
  } catch (err) {
    next(err);
  }
});

//delete a product
router.delete("/:id", async (req, res, next) => {
  try {
    const Mongoose = require("mongoose");
    const productId = Mongoose.Types.ObjectId(req.params.id);
    const deleteProduct = await Product.findByIdAndRemove(productId);

    if (!deleteProduct) throw new Error("Product Not Found");

    const subCat = await SubCategory.findById(req.params.subId);
    console.log(subCat);
    const indexOfRemovedProduct = subCat.products.indexOf(productId); // delete refrence of products in subcat array
    subCat.products.splice(indexOfRemovedProduct, 1);
    await subCat.save();

    res.json(deleteProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
