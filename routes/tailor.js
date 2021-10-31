const router = require("express").Router(),
  mongoose = require("mongoose"),
  Tailor = require("../models/Tailor"),
  verify = require("./verifyToken");

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
router.get("/:id", async (req, res, next) => {
  try {
    const getOneTailor = await Tailor.findById(req.params.id);
    res.json(getOneTailor);
  } catch (err) {
    next(err);
  }
});


router.patch("/:id", async (req,res, next)){
  findByIdAndUpdate(id, ...)
}

module.exports = router;
