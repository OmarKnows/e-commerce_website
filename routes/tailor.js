const router = require("express").Router(),
  mongoose = require("mongoose"),
  Tailor = require("../models/Tailor"),
  verify = require("./verifyToken");
//get all tailors
router.get("/", verify, async (req, res, next) => {
  try {
    const showAllTailors = await Tailor.find();
    res.json(showAllTailors);
  } catch (err) {
    next(err);
  }
});

//get only one tailor
router.get("/:id", verify, async (req, res) => {
  try {
    const getOneTailor = await Tailor.findById(req.params.id);
    res.json(getOneTailor);
  } catch (err) {
    next(err);
  }
});
module.exports = router;
