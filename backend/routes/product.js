const router = require("express").Router();
const Product = require("../models/Product");
const verify = require("../controllers/verifyToken");

//Add New Product
router.post("/", async (req, res, next) => {
  try {
    const { name, category, subcategory, gender, descripton, owner, size } =
      req.body;

    const newProduct = new Product({
      name: name,
      subcategory: req.params.subId,
      gender: gender,
      descripton: descripton,
      owner: owner,
      size: size,
    });
    const savedProduct = await newProduct.save();
    res.json(savedProduct);
  } catch (err) {
    next(err);
  }
});

//Get all products
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
