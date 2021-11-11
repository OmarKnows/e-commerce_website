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

//delete category with related subcategories and products
router.delete("/:id", async (req, res, next) => {
  try {
    const Mongoose = require("mongoose");
    const subId = Mongoose.Types.ObjectId(req.params.id);
    const deleteSubCategory = await SubCategory.findByIdAndRemove(subId);

    if (!deleteSubCategory) throw new Error("SubCategory Not Found");

    const Cat = await Category.findById(req.params.catId);
    const indexOfRemovedSubCategory = Cat.subcategory.indexOf(subId); // delete refrence of subcat in Cat array
    Cat.subcategory.splice(indexOfRemovedSubCategory, 1);
    await Cat.save();

    await deleteSubCategory.remove(); // calling remove hook to remove related documents

    res.json(deleteSubCategory);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
