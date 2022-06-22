const User = require("../User/User.model");
const {
  userUpdateValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
} = require("../../utils/userValidationAndVerification/joiValidation");

const createError = require("../../utils/errors/error-module");

//const { findById } = require("../Order/Order.model");

const register = async (req, res) => {
  const { error } = userRegisterValidationSchema(req.body); // validating body based on type
  if (error) throw createError(400, error);

  const token = user.CreateJWT();
  const user = await User.create(req.body);
  res.status(201).json({ token });
};

const login = async (req, res, next) => {
  const { error } = userLoginValidationSchema(req.body);
  if (error) throw createError(400, error.details[0]); // did not meet with validation schema
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw createError(401, "user not found");

  const isPasswordMatch = await user.comparePass(req.body.password);
  if (!isPasswordMatch) throw err(401, "Username or Password is incorrect");

  const token = user.CreateJWT();
  res.status(200).json({ token });
};

const getOneUser = async (req, res) => {
  const getUser = await User.findById(req.params.id);
  if (!getUser) throw createError(401, "user not found");
  res.status(200).json(getUser);
};

const updateUser = async (req, res) => {
  // validation for the info to be updated
  const { error } = userUpdateValidationSchema(req.body);
  if (error) throw createError(400, error.details[0]); // did not meet with validation schema

  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates);
  if (!updatedUser) throw createError(401, "user not found");
  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.user._id);
  if (!deletedUser) throw createError(401, "user not found");
  res.status(200).json(deletedUser);
};

module.exports = {
  register,
  login,
  getOneUser,
  updateUser,
  deleteUser,
};
