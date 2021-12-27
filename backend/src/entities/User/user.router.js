const router = require("express").Router();
const userController = require("./user.controller");

// get users based on type ( vendor, tailor or a basic user)
router.get("/:userType", userController.getUser);

// get one user
router.get("/:id", userController.getOneUser);

// update user info
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
