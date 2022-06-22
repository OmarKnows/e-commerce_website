const router = require("express").Router();
const {
  addNewProduct,
  getAllProducts,
  getOneProduct,
  addNewSize,
  updateSizes,
  deleteProduct,
} = require("./product.controller");

router.route("/").post(addNewProduct).get(getAllProducts);

router
  .route("/:id")
  .get(getOneProduct)
  .post(addNewSize)
  .patch(updateSizes)
  .delete(deleteProduct);

module.exports = router;
