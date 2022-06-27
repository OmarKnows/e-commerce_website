const router = require("express").Router();
const {
  getUser,
  getOneUser,
  updateUser,
  deleteUser,
  register,
  login,
} = require("./user.controller");

// sign up
router.route("/register").post(register);

// login
router.route("/login").post(login);

// get users based on type ( vendor, tailor or a basic user) with some filters
router.route("/").get(getUser);

// get, update, delete one user
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
