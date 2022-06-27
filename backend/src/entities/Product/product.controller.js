const Product = require("./Product.model");
const User = require("../User/User.model");
const createError = require("../../utils/errors/error-module");

// todo list
// 1- image upload
// 2- authorization
// 4- review and rating
// 5- wishlist

const addNewProduct = async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(201).json(newProduct);

  // if (req.user.userType !== 'vendor')
  //   throw new Error('Please Sign up as a vendor');
  //const vendor = await User.findById(req.user._id);
  //vendor.vendorItems.push(savedProduct);
};

const getAllProducts = async (req, res) => {
  const { gender, category, querySize } = req.query;

  const queryObject = {};
  if (gender) queryObject.gender = gender;
  if (category) queryObject.category = category;

  let result = Product.find(queryObject);

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const products = await result;

  // search if a specific size is available
  if (querySize) {
    const prod = [];
    products.forEach((element) => {
      for (let j = 0; j < element.sizes.length; j++) {
        if (element.sizes[j].sizeName == querySize) {
          prod.push(element);
          break;
        }
      }
    });

    return res.status(200).json(prod);
  }

  if (products.length === 0)
    throw createError(404, "There are no products found");

  res.status(200).json(products);
};

const getOneProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (!product) throw createError(404, "There are no products found");

  res.status(200).json(product);
};

const addNewSize = async (req, res, next) => {
  // if (req.user.userType !== "vendor")
  //   throw new Error("Please Sign up as a vendor");

  const product = await Product.findById(req.params.id);

  // if (req.user._id != product.vendorId)
  //   return next(new Error("You don't have permission"));

  /// the size already exists please go to update tab if u want to change
  for (let size = 0; size < product.sizes.length; size++) {
    if (req.body.sizeName === product.sizes[size].sizeName)
      throw createError(400, "This size already exists you can go update it");
  }

  product.sizes.push(req.body);
  await product.save();

  res.status(200).json(product);
};
const updateSizes = async (req, res, next) => {
  // if (req.user.userType !== "vendor")
  //   throw new Error("Please Sign up as a vendor");

  const { name, gender, description, sizes } = req.body;

  const product = await Product.findById(req.params.id);
  // if (req.user._id != product.vendorId)
  //   return next(new Error("You don't have permission"));

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
};

const deleteProduct = async (req, res, next) => {
  // if (req.user.userType !== "vendor")
  //   throw new Error("Please Sign up as a vendor");

  // if (req.user._id != product.vendorId)
  //   return next(new Error("You don't have permission"));

  const product = await Product.findOneAndDelete({ _id: req.params.id });

  if (!product) throw createError(404, "Product doesn't exist");

  res.status(200).json({ product });
};

// const addToWishlist = async (req, res, next) => {
//   try {
//     if (req.user.userType === "vendor") return next(); // valid only for basic users and tailors
//     const product = await Product.findById(req.params.id);
//     const user = await User.findById(req.user._id);

//     const productExists = user.userWishlist.some((prod) => {
//       return prod._id == product.id;
//     });

//     if (productExists)
//       throw new Error("This Product already exists in your wishlist");

//     user.userWishlist.push(product);
//     await user.save();

//     res.json({ message: "product added to your wishlist" });
//   } catch (err) {
//     next(err);
//   }
// };
// const getWishlist = async (req, res, next) => {
//   try {
//     if (req.user.userType === "vendor") return next(); // valid only for basic users and tailors
//     const user = await User.findById(req.user._id);
//     if (user.userWishlist.length === 0)
//       res.json({ message: " There is no items in your wish list" });
//     res.json(user.userWishlist);
//   } catch (err) {
//     next(err);
//   }
// };
// const removeFromWishlist = async (req, res, next) => {
//   try {
//     if (req.user.userType === "vendor") return next(); // valid only for basic users and tailors
//     const user = await User.findById(req.user._id);
//     user.userWishlist.forEach(async (wish) => {
//       if (wish._id == req.params.id) {
//         const idx = user.userWishlist.indexOf(wish);
//         user.userWishlist.splice(idx, 1);
//         await user.save();
//       }
//     });
//     res.json({ message: "item removed" });
//   } catch (err) {
//     next(err);
//   }
// };
// const addReview = async (req, res, next) => {
//   try {
//     const { rating, comment } = req.body;

//     const product = await Product.findById(req.params.id);

//     if (product) {
//       const alreadyReviewed = product.reviews.find(
//         (r) => r.user.toString() === req.user._id.toString()
//       );

//       if (alreadyReviewed) {
//         res.status(400);
//         throw new Error("Product already reviewed");
//       }

//       const review = {
//         name: req.user.username,
//         rating: Number(rating),
//         comment,
//         user: req.user._id,
//       };

//       product.reviews.push(review);

//       product.rating =
//         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//         product.reviews.length;

//       await product.save();
//       console.log(product.rating);
//       res.json({ message: "Review added" });
//     }
//   } catch (err) {
//     next(err);
//   }
// };

module.exports = {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  addNewSize,
  updateSizes,
  deleteProduct,
};
