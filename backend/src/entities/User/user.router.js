const router = require("express").Router();
const {
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

// get, update, delete one user
router.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser);

// // get users based on type ( vendor, tailor or a basic user)
// router.get("/:userType", userController.getUser);

module.exports = router;
