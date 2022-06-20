const router = require('express').Router();
const {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  addNewSize,
  updateSizes,
  deleteProduct,
} = require('./product.controller');
// const uploadImage = require('../../utils/image upload/uploadImg');

//Add New Product
router.route('/').post(addNewProduct);

//Get all products
router.route('/').get(getAllProducts);

//Get all products in a specific category
//router.get('/:category', productController.getCategoryProducts);

//Get all products in a specific category & subcategory
//outer.get('/:category/:subcategory', productController.getSubcategoryProducts);

//Get one product
router
  .route('/:id')
  .get(getOneProduct)
  .post(addNewSize)
  .patch(updateSizes)
  .delete(deleteProduct);

// get a wishlist
//router.get('/user/wishlist', productController.getWishlist);

// add to a wishlist
//router.post('/user/add-to-wishlist/:id', productController.addToWishlist);

// remove from a wishlist
// router.delete(
//   '/user/remove-from-wishlist/:id',
//   productController.removeFromWishlist
// );

// add review
// router.post('/review/add-review/:id', productController.addReview);

module.exports = router;
