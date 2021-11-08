const router = require("express").Router({ mergeParams: true });
const verify = require("../controllers/verifyToken");
const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");

//Add New subCategory
router.post("/", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Not Found");

    const { name, image } = req.body;
    const newSub = new SubCategory({
      name: name,
      image: image,
    });

    const savedSub = await newSub.save();
    category.subcategory.push(savedSub); // adding new sub category to the catgory array
    await category.save();

    res.json(savedSub);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const subs = await Category.findById(req.params.catId)
      .populate("subcategory")
      .exec(); // get all subcategories

    res.json(subs.subcategory);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
