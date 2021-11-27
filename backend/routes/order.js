const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken } = require("../controllers/verification");

//place order (only tailor and user can place orders)
router.post("/", async (req, res, next) => {
  try {
    //const ownerId = req.user._id;
    const orderLines = req.body.products;

    //////////////////////////////////////////////////////////////////////

    const pendingPromise = orderLines.map(async (line) => {
      const product = await Product.findById(line.productId);
      if (!product) {
        res.json({
          error: `The product id ->   ${line.productId}   is not found`,
        });
      }
      return { ...product.items };
    });

    console.log(pendingPromise);
    const verifiedItems = await Promise.all(pendingPromise);
    //res.send(...resolvedPromise);

    console.log(verifiedItems);
    /////////////////////////////////////////////////////////////
  } catch (error) {
    next(error);
  }

  /*
  //done
   const newOrder = new Order({
     ownerId: ownerId,
     products: products,
   });

   const savedOrder = await newOrder.save()
  res.send("hi");*/
});

module.exports = router;
