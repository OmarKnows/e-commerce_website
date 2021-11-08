const router = require("express").Router();
const Category = require("../models/Category");
const verify = require("../controllers/verifyToken");

//Add New Category
router.post("/add", async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = new Category({
      name: name,
    });
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
