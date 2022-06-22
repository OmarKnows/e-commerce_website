const User = require("../User/User.model");
const {
  userUpdateValidationSchema,
  userLoginValidationSchema,
  userRegisterValidationSchema,
} = require("../../utils/userValidationAndVerification/joiValidation");

//const { findById } = require("../Order/Order.model");

const register = async (req, res) => {
  const { error } = userRegisterValidationSchema(req.body); // validating body based on type
  if (error) throw new Error(error);
  const token = user.CreateJWT();
  const user = await User.create(req.body);
  res.status(201).json({ token });
};

const login = async (req, res, next) => {
  const { error } = userLoginValidationSchema(req.body);
  if (error) return next(error.details[0]); // ===> error when username, email, password not meet with validation schema
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new Error("User email not found");

  const isPasswordMatch = await user.comparePass(req.body.password);
  // if (!isPasswordMatch) throw err(401, "Username or Password is incorrect");

  const token = user.CreateJWT();

  res.status(200).json({ token });
};

const getOneUser = async (req, res) => {
  const getUser = await User.findById(req.params.id);
  if (!getUser) throw new Error("No users found");
  res.status(200).json(getUser);
};

const updateUser = async (req, res) => {
  // validation for the info to be updated
  const { error } = userUpdateValidationSchema(req.body);
  if (error) throw new Error(error.details[0]);

  const updates = req.body;
  const updatedUser = await User.findByIdAndUpdate(req.user._id, updates);
  if (!updatedUser) throw new Error("User is not found");
  res.status(200).json(updatedUser);
};

const deleteUser = async (req, res) => {
  // we need to delete token from client to make sure not returning null values

  const deletedUser = await User.findByIdAndDelete(req.user._id);
  if (!deletedUser) throw new Error("User is not found");
  res.status(200).json(deletedUser);
};

module.exports = {
  register,
  login,
  getOneUser,
  updateUser,
  deleteUser,
};
