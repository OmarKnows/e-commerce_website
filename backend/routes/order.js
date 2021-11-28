const router = require("express").Router();
const Order = require("../models/Order");
const { verifyToken } = require("../controllers/verification");
const verifyCartItems = require("../controllers/orderHelperFunctions");

//place order (only tailor and user can place orders)
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const orderLines = req.body.products;

    //external helper function to verify cart items
    await verifyCartItems(orderLines);

    //make a new order and save it into db
    const newOrder = new Order({
      ownerId: req.user._id,
      products: orderLines,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
