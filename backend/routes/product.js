const router = require("express").Router({ mergeParams: true });
const Product = require("../models/Product");
const { verifyToken, verifyVendor } = require("../controllers/verification");
const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");
const Vendor = require("../models/Vendor");

//Add New Product
router.post("/", verifyToken, verifyVendor, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Is Not Found");

    const subcategory = await SubCategory.findById(req.params.subId);
    if (!subcategory) throw new Error("SubCategory Is Not Found");

    const { name, gender, descripton, items } = req.body;

    const newProduct = new Product({
      name: name,
      gender: gender,
      descripton: descripton,
      items: items,
      vendorId: req.user._id,
      vendorName: req.user.username,
    });
    const savedProduct = await newProduct.save();
    subcategory.products.push(savedProduct);

    const vendor = await Vendor.findById(req.user._id);
    vendor.products.push(savedProduct);

    await vendor.save();
    await subcategory.save();

    res.json(savedProduct);
  } catch (err) {
    next(err);
  }
});

//Get all products in a subcategory
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Is Not Found");

    const subcategory = await SubCategory.findById(req.params.subId)
      .populate("products")
      .exec();

    if (!subcategory) throw new Error("SubCategory Is Not Found");
    if (subcategory.products.length === 0)
      res.json({ message: "There Is No Products Yet" });
    else res.json(subcategory.products);
  } catch (err) {
    next(err);
  }
});

/// => verify that this product is for that vendor
//Add New Item in a Product
router.post("/:id", verifyToken, verifyVendor, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Is Not Found");

    const subcategory = await SubCategory.findById(req.params.subId);
    if (!subcategory) throw new Error("SubCategory Is Not Found");

    product.items.push(req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Get items  in a product
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Is Not Found");

    const subcategory = await SubCategory.findById(req.params.subId);
    if (!subcategory) throw new Error("SubCategory Is Not Found");

    const product = await Product.findById(req.params.id);
    res.json(product.items);
  } catch (err) {
    next(err);
  }
});

//Update items  in a product
router.patch("/:id", verifyToken, verifyVendor, async (req, res, next) => {
  try {
    const { name, gender, description, items } = req.body;

    const product = await Product.findById(req.params.id);
    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    /////////////////////// UPDATING THE PRODUCT INFO ////////////////////////
    if (name) product.name = name;
    if (gender) product.gender = gender;
    if (description) product.description = description;
    /////////////////////////////////////////////////////////////////////////

    /////////////////// UPDATING THE ITEMS INSIDE THE PRODUCT /////////////
    if (items) {
      product.items.forEach((item) => {
        if (item._id == items.id) {
          //if the body has itemName so we update it
          if (items.itemName) item.itemName = items.itemName;
          //if the body has price so we update it
          if (items.price) item.price = items.price;
          //if the body has a colour we add it to colour array
          if (items.colour) {
            let colorExist = false;
            item.colour.forEach((cl) => {
              if (colorExist) return;

              //if the colour already exists we add 1 to quantity
              if (cl.colourName == items.colour.colourName) {
                cl.quantity++;
                colorExist = true;
              }
            });
            // else we push that new colour
            if (colorExist === false) {
              if (!items.colour.quantity) items.colour.quantity = 1;
              item.colour.push(items.colour);
            }
          }
        }
      });
    }
    /////////////////////////////////////////////////////////////////////////
    await product.save();
    res.json(product.items);
  } catch (err) {
    next(err);
  }
});

//delete a product
router.delete("/:id", verifyToken, verifyVendor, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.catId);
    if (!category) throw new Error("Category Is Not Found");

    const subCat = await SubCategory.findById(req.params.subId);
    if (!subCat) throw new Error("Subcategory Is Not Found");

    const product = await Product.findById(req.params.id);

    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    const Mongoose = require("mongoose");
    const productId = Mongoose.Types.ObjectId(req.params.id);
    const deleteProduct = await Product.findByIdAndRemove(productId);
    if (!deleteProduct) throw new Error("Product Is Not Found");

    const indexOfRemovedProduct = subCat.products.indexOf(productId); // delete refrence of products in subcat array
    subCat.products.splice(indexOfRemovedProduct, 1);
    await subCat.save();

    res.json(deleteProduct);
  } catch (err) {
    next(err);
  }
});

// delete item || color from array => ??? kol wa7ed fehom leeh id hal a3ml l kol wa7ed fehom route?
// refactoring

module.exports = router;
