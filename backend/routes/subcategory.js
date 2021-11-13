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

    const subAlreadyExist = await SubCategory.findOne({ name: name });
    if (subAlreadyExist) throw new Error("Subcategory Already Exists");

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

// get all subcategories
router.get("/", async (req, res, next) => {
  try {
    const subs = await Category.findById(req.params.catId)
      .populate("subcategory")
      .exec();

    if (!subs) throw new Error("Category Not Found");

    if (subs.subcategory.length === 0)
      res.json({ message: "There Is No Subcategories Yet" });
    else res.json(subs.subcategory);
  } catch (err) {
    next(err);
  }
});

//update subcategory
router.patch("/:id", async (req, res, next) => {
  try {
    // if the category isn't found
    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Not Found");

    const Mongoose = require("mongoose");
    const subId = Mongoose.Types.ObjectId(req.params.id);

    // if the subcategory isn't found
    const updatedSub = await SubCategory.findByIdAndUpdate(subId, req.body);
    if (!updatedSub) throw new Error("Subcategory Not Found");

    res.json(updatedSub);
  } catch (err) {
    next(err);
  }
});

//delete subcategories and related products
router.delete("/:id", async (req, res, next) => {
  try {
    const Cat = await Category.findById(req.params.catId);
    if (!Cat) throw new Error("Category Not Found");

    const Mongoose = require("mongoose");
    const subId = Mongoose.Types.ObjectId(req.params.id);

    const deleteSubCategory = await SubCategory.findByIdAndRemove(subId);
    if (!deleteSubCategory) throw new Error("SubCategory Not Found");

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
