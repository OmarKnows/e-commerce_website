const User = require("../User/User.model");
const {
  userUpdateValidationSchema,
} = require("../../utils/userValidationAndVerification/joiValidation");

exports.getTailors = async (req, res, next) => {
  try {
    const getTailors = await User.find({ userType: "tailor" });
    if (!getTailors) throw new Error("No tailors found");
    res.json(getTailors);
  } catch (err) {
    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    if (!getTailors) throw new Error("No users found");
    res.json(getUser);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  // validation for the info to be updated
  try {
    const { error } = userUpdateValidationSchema(req.body);
    if (error) return next(error.details[0]);

    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates);
    if (!updatedUser) return next(); // if the user does not exist
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
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
};
