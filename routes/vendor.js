const router = require("express").Router();
const Vendor = require("../models/Vendor");
const verify = require("./verifyToken");
const { userUpdateValidationSchema } = require("../models/joiValidation");

//get only one vendor to be accessed from any other users
router.get("/:id", verify, async (req, res, next) => {
  try {
    const getOneVendor = await Vendor.findById(req.params.id);
    res.json(getOneVendor);
  } catch (err) {
    next(err);
  }
});

//vendor Profile only accessed by himself or Admin
router.get("/:id/profile", verify, async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id || req.user.type !== "vendor")
      throw new Error("Youd don't have permission");
    const getVendorProfile = await Vendor.findById(req.user._id);
    res.json(getVendorProfile);
  } catch (err) {
    next(err);
  }
});

// update Vendor info only accessed by himself or Admin
router.patch("/:id/profile", verify, async (req, res, next) => {
  // validation for the info to be updated
  const { error } = userUpdateValidationSchema(
    req.body
  );
  if (error) return next(error.details[0]);

  try {
    if (req.params.id !== req.user._id || req.user.type !== "vendor")
      throw new Error("Youd don't have permission"); ////// Vendor can only update himself or Admin

    const updates = req.body;
    const updatedVendor = await Vendor.findByIdAndUpdate(req.user._id, updates);
    if (!updatedVendor) return next(); // if the user does not exist
    res.json(updatedVendor);
  } catch (err) {
    next(err);
  }
});

// delete Vendor only accessed by himself or Admin
router.delete("/:id/profile", verify, async (req, res, next) => {
  // we need to delete token from client to make sure not returning null values
  try {
    if (req.params.id !== req.user._id || req.user.type !== "vendor")
      throw new Error("Youd don't have permission"); ////// Vendor can only delete himself or Admin

    const deletedVendor = await Vendor.findByIdAndDelete(req.user._id);
    if (!deletedVendor) return next(); // if the user does not exist
    res.json(deletedVendor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
