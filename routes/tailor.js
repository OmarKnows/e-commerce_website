const router = require("express").Router(),
  mongoose = require("mongoose"),
  Tailor = require("../models/Tailor");

//get all tailors
router.get("/", async (req, res) => {
  try {
    const showAllTailors = await Tailor.find();
    res.json(showAllTailors);
  } catch (err) {
    res.status(400).send(err);
  }
});

//get only one tailor
router.get("/:id", async (req, res) => {
  try {
    const getOneTailor = await Tailor.findById(req.params.id);
    res.json(getOneTailor);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
