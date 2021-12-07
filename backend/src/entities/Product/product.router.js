const router = require("express").Router({ mergeParams: true });
const Product = require("./Product.model");
const {
  verifyToken,
  verifyVendor,
} = require("../../../controllers/verification");

//Add New Product
router.post("/", verifyVendor, async (req, res, next) => {
  try {
    const { name, category, subcategory, gender, description, items } =
      req.body;

    const newProduct = new Product({
      name,
      gender,
      category,
      subcategory,
      description,
      items,
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

//Add New Item in a Product
router.post("/:id", verifyVendor, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (req.user._id != product.vendorId)
      return next(new Error("You don't have permission"));

    /// the item already exists please go to update tab if u want to change

    product.items.push(req.body);
    await product.save();

    res.json(product);
  } catch (err) {
    next(err);
  }
});

//Update items  in a product
router.put("/:id", verifyVendor, async (req, res, next) => {
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
        if (item.itemName === items.itemName) {
          //if the body has price so we update it
          if (items.price) item.price = items.price;
          //if the body has a colour we add it to colour array
          if (items.colour) {
            let colorExist = false;
            item.colour.forEach((cl) => {
              if (colorExist) return;
              //if the colour already exists we add 1 to quantity
              if (cl.colourName === items.colour.colourName) {
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
