const router = require("express").Router();
const User = require("../User/User.model");
const { verifyToken } = require("../../../controllers/verification");
const {
  userUpdateValidationSchema,
} = require("../../../controllers/joiValidation");

//User Profile only accessed by himself or Admin
router.get("/:id", async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id || req.user.type !== "user")
      throw new Error("Youd don't have permission");
    const getUserProfile = await User.findById(req.user._id);
    res.json(getUserProfile);
  } catch (err) {
    next(err);
  }
});

// update user info only accessed by himself or Admin
router.put("/:id", async (req, res, next) => {
  // validation for the info to be updated
  const { error } = userUpdateValidationSchema(req.body);
  if (error) return next(error.details[0]);

  try {
    if (req.params.id !== req.user._id || req.user.type !== "user")
      throw new Error("Youd don't have permission"); ////// user can only update himself or Admin

    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates);
    if (!updatedUser) return next(); // if the user does not exist
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// delete user only accessed by himself or Admin
router.delete("/:id", async (req, res, next) => {
  // we need to delete token from client to make sure not returning null values
  try {
    if (req.params.id !== req.user._id || req.user.type !== "user")
      throw new Error("Youd don't have permission"); ////// user can only delete himself or Admin

    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) return next(); // if the user does not exist
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
