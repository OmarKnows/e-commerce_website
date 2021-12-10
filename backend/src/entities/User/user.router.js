const router = require("express").Router();
const userController = require("./user.controller");

router.get("/tailors", userController.getTailors);

router.get("/:id", userController.getUsers);

// update user info
router.put("/:id", userController.updateUser);

// delete user
router.delete("/:id", userController.deleteUser);

module.exports = router;
