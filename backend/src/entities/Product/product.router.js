const router = require("express").Router();
const {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  addNewSize,
  updateSizes,
  deleteProduct,
} = require("./product.controller");

//Add New Product
router.route("/").post(addNewProduct);

//Get all products
router.route("/").get(getAllProducts);

//Crud
router
  .route("/:id")
  .get(getOneProduct)
  .post(addNewSize)
  .patch(updateSizes)
  .delete(deleteProduct);

module.exports = router;
