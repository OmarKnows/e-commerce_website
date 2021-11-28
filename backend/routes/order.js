const router = require("express").Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const { verifyToken } = require("../controllers/verification");

//place order (only tailor and user can place orders)
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const orderLines = req.body.products;
    //////////////////////////////////////////////////////////////////////

    // First for is looping through the items inside the cart to make sure if that product exists or no
    // The 2nd for is looping throgh each size inside the product
    // The 3rd for is looping through each colour inside each size inside each product ( Product[i] -> size[j] -> colour[k] )
    for (let i = 0; i < orderLines.length; i++) {
      let sizeFlag = false;
      let colourFlag = false;
      const product = await Product.findByIdAndUpdate(orderLines[i].productId);
      if (!product) {
        // if the product doesn't exist
        throw new Error(
          `The product id -> ${orderLines[i].productId} doesn't exist`
        );
      }
      for (let j = 0; j < product.items.length; j++) {
        if (orderLines[i].size === product.items[j].itemName) {
          sizeFlag = true;
          for (let k = 0; k < product.items[j].colour.length; k++) {
            if (
              product.items[j].colour[k].colourName === orderLines[i].colour
            ) {
              colourFlag = true;
              if (product.items[j].colour[k].quantity < orderLines[i].quantity)
                throw new Error(
                  `The quantity of the colour ${orderLines[i].colour} of the size ${orderLines[i].size} of the product id -> ${orderLines[i].productId} is not enough `
                );
              else {
                product.items[j].colour[k].quantity -= orderLines[i].quantity;
              }
            }
          }
          if (!colourFlag) {
            // if the colour doesn't exist
            throw new Error(
              `The colour ${orderLines[i].colour} of the size ${orderLines[i].size} of the product id -> ${orderLines[i].productId} doesn't exist`
            );
          }
        }
      }
      if (!sizeFlag) {
        // if the size doesn't exist
        throw new Error(
          `The size ${orderLines[i].size} of the product id -> ${orderLines[i].productId} doesn't exist`
        );
      }
      if (sizeFlag === true && colourFlag === true) await product.save(); // save to db if there were changes at the end of each loop
    }

    const newOrder = new Order({
      ownerId: req.user._id,
      products: orderLines,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
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
