const Product = require("./Product.model");
const User = require("../User/User.model");

exports.addNewProduct = async (req, res, next) => {
  try {
    if (req.user.userType !== "vendor")
      throw new Error("Please Sign up as a vendor");
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
    const vendor = await User.findById(req.user._id);
    const savedProduct = await newProduct.save();
    vendor.vendorItems.push(savedProduct);
    await vendor.save();
    res.json(savedProduct);
  } catch (err) {
    next(err);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length === 0) throw new Error("There is no products found");
    else res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getCategoryProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      category: req.params.category.toLowerCase(),
    });
    if (products.length === 0) next();
    else res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getSubcategoryProducts = async (req, res, next) => {
  try {
    const products = await Product.find({
      category: req.params.category.toLowerCase(),
      subcategory: req.params.subcategory.toLowerCase(),
    });
    if (products.length === 0) next();
    else res.json(products);
  } catch (err) {
    next(err);
  }
};

exports.getOneProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) throw new Error("There is no product found");
    else res.json(product);
  } catch (err) {
    next(err);
  }
};

exports.addNewSize = async (req, res, next) => {
  try {
    if (req.user.userType !== "vendor")
      throw new Error("Please Sign up as a vendor");

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
};

exports.updateSizes = async (req, res, next) => {
  try {
    if (req.user.userType !== "vendor")
      throw new Error("Please Sign up as a vendor");

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
};

exports.deleteProduct = async (req, res, next) => {
  try {
    if (req.user.userType !== "vendor")
      throw new Error("Please Sign up as a vendor");

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
};

exports.addToWishlist = async (req, res, next) => {
  try {
    if (req.user.userType === "vendor") return next(); // valid only for basic users and tailors
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user._id);

    const productExists = user.userWishlist.some((prod) => {
      return prod._id == product.id;
    });

    if (productExists)
      throw new Error("This Product already exists in your wishlist");

    user.userWishlist.push(product);
    await user.save();

    res.json({ message: "product added to your wishlist" });
  } catch (err) {
    next(err);
  }
};
exports.getWishlist = async (req, res, next) => {
  try {
    if (req.user.userType === "vendor") return next(); // valid only for basic users and tailors
    const user = await User.findById(req.user._id);
    if (user.userWishlist.length === 0)
      res.json({ message: " There is no items in your wish list" });
    res.json(user.userWishlist);
  } catch (err) {
    next(err);
  }
};

exports.removeFromWishlist = async (req, res, next) => {
  try {
    if (req.user.userType === "vendor") return next(); // valid only for basic users and tailors
    const user = await User.findById(req.user._id);
    user.userWishlist.forEach(async (wish) => {
      if (wish._id == req.params.id) {
        const idx = user.userWishlist.indexOf(wish);
        user.userWishlist.splice(idx, 1);
        await user.save();
      }
    });
    res.json({ message: "item removed" });
  } catch (err) {
    next(err);
  }
};
