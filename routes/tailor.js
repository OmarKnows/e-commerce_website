const router = require("express").Router(),
  mongoose = require("mongoose"),
  Tailor = require("../models/Tailor"),
  verify = require("./verifyToken"),
  { userUpdateValidationSchema } = require("../models/joiValidation");

//get all tailors
router.get("/", verify, async (req, res, next) => {
  try {
    ///////////////////////// This function enables the tailor to see other tailors except himself /////////
    if (req.user.type === "tailor") {
      const allTailors = await Tailor.find();
      const allTailorsExceptOne = allTailors.filter(
        (tailor) => tailor._id != req.user._id
      );
      res.json(allTailorsExceptOne);
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    } else {
      const showAllTailors = await Tailor.find();
      res.json(showAllTailors);
    }
  } catch (err) {
    next(err);
  }
});

//get only one tailor ====>Tailor Profile also
router.get("/:id", verify, async (req, res, next) => {
  try {
    const getOneTailor = await Tailor.findById(req.params.id);
    res.json(getOneTailor);
  } catch (err) {
    next(err);
  }
});

// update tailor info
router.patch("/:id", verify, async (req, res, next) => {
  // validation for the info to be updated
  const { error } = userUpdateValidationSchema({
    username: req.body.username,
    email: req.body.email,
  });
  if (error) return next(error.details[0]);

  try {
    if (req.params.id !== req.user._id)
      throw new Error("Youd don't have permission"); ////// Tailor can only update himself or Admin

    const updates = req.body;
    const updatedTailor = await Tailor.findByIdAndUpdate(req.user._id, updates);
    if (!updatedTailor) return next(); // if the user does not exist
    res.json(updatedTailor);
  } catch (err) {
    next(err);
  }
});

// delete tailor
router.delete("/:id", verify, async (req, res, next) => {
  try {
    if (req.params.id !== req.user._id)
      throw new Error("Youd don't have permission"); ////// Tailor can only delete himself or Admin

    const deletedTailor = await Tailor.findByIdAndDelete(req.user._id);
    if (!deletedTailor) return next(); // if the user does not exist
    res.json(deletedTailor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
