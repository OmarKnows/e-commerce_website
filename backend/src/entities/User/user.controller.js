const User = require("../User/User.model");
const {
  userUpdateValidationSchema,
} = require("../../utils/userValidationAndVerification/joiValidation");
const { findById } = require("../Order/Order.model");

exports.getUser = async (req, res, next) => {
  try {
    const getUser = await User.find({ userType: req.params.userType });
    if (!getUser) throw new Error("No users found");
    res.json(getUser);
  } catch (err) {
    next(err);
  }
};

exports.getOneUser = async (req, res, next) => {
  try {
    const getUser = await User.findById(req.params.id);
    if (!getUser) throw new Error("No users found");
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
    const deletedUser = await User.findByIdAndDelete(req.user._id);
    if (!deletedUser) return next(); // if the user does not exist
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
};
