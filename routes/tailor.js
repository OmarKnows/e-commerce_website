const router = require("express").Router(),
  mongoose = require("mongoose"),
  Tailor = require("../models/Tailor"),
  verify = require("./verifyToken");
//get all tailors
router.get("/", verify, async (req, res) => {
  try {
    const showAllTailors = await Tailor.find();
    res.json(showAllTailors);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get only one tailor
router.get("/:id", verify, async (req, res) => {
  try {
    const getOneTailor = await Tailor.findById(req.params.id);
    res.json(getOneTailor);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
