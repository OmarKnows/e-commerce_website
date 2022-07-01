const Order = require("../Order/Order.model");
const Product = require("../Product/Product.model");
const sendEmail = require("../../utils/emails/sendEmail");

exports.newOrder = async (req, res, next) => {
  //place order (only tailor and user can place orders)
  if (req.user.type === "vendor")
    throw new Error("Please signup as a user or a tailor");

  const orderLines = req.body.products;

  //external helper function to verify cart items
  await verifyCartsizes(orderLines);

  //make a new order and save it into db
  const newOrder = new Order({
    ownerId: req.user._id,
    products: orderLines,
  });

  const savedOrder = await newOrder.save();
  const purchasedProduct = await Promise.all(
    savedOrder.products.map(async (element) => {
      const prod = await Product.findById(element.productId);
      return prod.name;
    })
  );

  res.send(200).json(purchasedProduct);
};

async function verifyCartsizes(orderLines) {
  // After looping throgh each product in the cart we want to make sure that
  // the order will not be processed unless all product and its sizes are available
  // so we are making an array to save the resolved product and save them one at a time
  const transaction = [];

  // First for is looping through the sizes inside the cart to make sure if that product exists or no
  // The 2nd for is looping throgh each size inside the product
  // The 3rd for is looping through each color inside each size inside each product ( Product[i] -> size[j] -> color[k] )
  for (let line = 0; line < orderLines.length; line++) {
    let sizeFlag = false;
    let colorFlag = false;
    const product = await Product.findOne(orderLines[line].productId);
    if (!product) {
      // if the product doesn't exist
      throw new Error(
        `The product id -> ${orderLines[line].productId} doesn't exist`
      );
    }
    for (let size = 0; size < product.sizes.length; size++) {
      if (orderLines[line].size === product.sizes[size].sizeName) {
        sizeFlag = true;
        for (let cl = 0; cl < product.sizes[size].color.length; cl++) {
          if (
            product.sizes[size].color[cl].colorName === orderLines[line].color
          ) {
            colorFlag = true;

            if (
              product.sizes[size].color[cl].quantity <
                orderLines[line].quantity ||
              product.sizes[size].color[cl].quantity === 0
            ) {
              {
                throw new Error(
                  `The quantity of the color ${orderLines[line].color} of the size ${orderLines[line].size} of the product id -> ${orderLines[line].productId} is not enough `
                );
              }
            } else {
              product.sizes[size].color[cl].quantity -=
                orderLines[line].quantity;
            }
            break; // no need to continue when we find the color
          }
        }
        if (!colorFlag) {
          // if the color doesn't exist
          throw new Error(
            `The color ${orderLines[line].color} of the size ${orderLines[line].size} of the product id -> ${orderLines[line].productId} doesn't exist`
          );
        }
        break; // no need to continue when we find the size
      }
    }
    if (!sizeFlag) {
      // if the size doesn't exist
      throw new Error(
        `The size ${orderLines[line].size} of the product id -> ${orderLines[line].productId} doesn't exist`
      );
    }
    transaction.push(product);
  }
  transaction.forEach(async (pro) => {
    // save order as one transaction so if there was any error in the cart nothing could be happen in the db
    await pro.save();
  });
}
