const router = require("express").Router();
const Category = require("../models/Category");
const verify = require("../controllers/verifyToken");

//Add New Category
router.post("/", async (req, res, next) => {
  try {
    const { name, image } = req.body;

    const newCategory = new Category({
      name: name,
      image: image,
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    next(err);
  }
});

//Get All Categories
router.get("/", async (req, res, next) => {
  try {
    const Categories = await Category.find();
    res.json(Categories);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
