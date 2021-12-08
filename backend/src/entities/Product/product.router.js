const router = require("express").Router({ mergeParams: true });
const Product = require("./Product.model");
const {
  verifyToken,
  verifyVendor,
} = require("../../../controllers/verification");

//Add New Product
router.post("/", verifyVendor, async (req, res, next) => {
  try {
    const { name, category, subcategory, gender, description, sizes } =
      req.body;

    const newProduct = new Product({
      name,
      gender,
      category,
      subcategory,
      description,
      sizes,
      vendorId: req.user._id,
      vendorName: req.user.username,
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
    if (products.length === 0) throw new Error("There is no products found");
    else res.json(products);
  } catch (err) {
    next(err);
  }
});

//Get all products in a specific category
router.get("/:category", async (req, res, next) => {
  try {
    const products = await Product.find({
      category: req.params.category,
    });
    if (products.length === 0) next();
    else res.json(products);
  } catch (err) {
    next(err);
  }
});

//Get all products in a specific category & subcategory
router.get("/:category/:subcategory", async (req, res, next) => {
  try {
    const products = await Product.find({
      category: req.params.category,
      subcategory: req.params.subcategory,
    });
    if (products.length === 0) next();
    else res.json(products);
  } catch (err) {
    next(err);
  }
});

//Get one product
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("There is no product found");
    else res.json(product);
  } catch (err) {
    next(err);
  }
});

//Add New size in a Product
router.post("/:id", verifyVendor, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    /// the size already exists please go to update tab if u want to change
    for (let size = 0; size < product.sizes.length; size++) {
      if (req.body.sizeName === product.sizes[size].sizeName)
        throw new Error("This size already exists you can go update it");
    }

    product.sizes.push(req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Update sizes  in a product
router.put("/:id", verifyVendor, async (req, res, next) => {
  try {
    const { name, gender, description, sizes } = req.body;

    const product = await Product.findById(req.params.id);
    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    /////////////////////// UPDATING THE PRODUCT INFO ////////////////////////
    if (name) product.name = name;
    if (gender) product.gender = gender;
    if (description) product.description = description;
    /////////////////////////////////////////////////////////////////////////

    /////////////////// UPDATING THE sizes INSIDE THE PRODUCT /////////////
    if (sizes) {
      product.sizes.forEach((size) => {
        if (size.sizeName === sizes.sizeName) {
          //if the body has price so we update it
          if (sizes.price) size.price = sizes.price;
          //if the body has a color we add it to color array
          if (sizes.color) {
            let colorExist = false;
            size.color.forEach((cl) => {
              //if the color already exists we add the quantity
              if (cl.colorName === sizes.color.colorName) {
                cl.quantity += sizes.color.quantity;
                colorExist = true;
              }
            });
            // else we push that new color
            if (colorExist === false) {
              if (!sizes.color.quantity) sizes.color.quantity = 1;
              size.color.push(sizes.color);
            }
          }
        }
      });
    }
    await product.save();
    res.json(product.sizes);
  } catch (err) {
    next(err);
  }
});

//delete a product
router.delete("/:id", verifyVendor, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("Product Is Not Found");
    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    const Mongoose = require("mongoose");
    const productId = Mongoose.Types.ObjectId(req.params.id);
    const deleteProduct = await Product.findByIdAndRemove(productId);

    res.json(deleteProduct);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
