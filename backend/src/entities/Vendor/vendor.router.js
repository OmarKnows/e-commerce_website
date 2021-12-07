const router = require("express").Router();
const Vendor = require("../Vendor/Vendor.model");
const { verifyToken } = require("../../../controllers/verification");
const {
  userUpdateValidationSchema,
} = require("../../../controllers/joiValidation");

//get only one vendor to be accessed from any other users
router.get("/:id", verifyToken, async (req, res, next) => {
  try {
    const getOneVendor = await Vendor.findById(req.params.id);
    res.json(getOneVendor);
  } catch (err) {
    next(err);
  }
});

// update Vendor info only accessed by himself or Admin
router.put("/:id", verifyToken, async (req, res, next) => {
  // validation for the info to be updated
  const { error } = userUpdateValidationSchema(req.body);
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
router.delete("/:id", verifyToken, async (req, res, next) => {
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
