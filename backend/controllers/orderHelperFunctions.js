const Product = require("../src/entities/Product/Product.model");

module.exports = async function verifyCartsizes(orderLines) {
  // After looping throgh each product in the cart we want to make sure that
  // the order will not be processed unless all product and its sizes are available
  // so we are making an array to save the resolved product and save them one at a time
  const transaction = [];

  // First for is looping through the sizes inside the cart to make sure if that product exists or no
  // The 2nd for is looping throgh each size inside the product
  // The 3rd for is looping through each color inside each size inside each product ( Product[i] -> size[j] -> color[k] )
  for (let i = 0; i < orderLines.length; i++) {
    let sizeFlag = false;
    let colorFlag = false;
    const product = await Product.findByIdAndUpdate(orderLines[i].productId);
    if (!product) {
      // if the product doesn't exist
      throw new Error(
        `The product id -> ${orderLines[i].productId} doesn't exist`
      );
    }
    for (let j = 0; j < product.sizes.length; j++) {
      if (orderLines[i].size === product.sizes[j].sizeName) {
        sizeFlag = true;
        for (let k = 0; k < product.sizes[j].color.length; k++) {
          if (product.sizes[j].color[k].colorName === orderLines[i].color) {
            colorFlag = true;

            if (product.sizes[j].color[k].quantity < orderLines[i].quantity) {
              {
                throw new Error(
                  `The quantity of the color ${orderLines[i].color} of the size ${orderLines[i].size} of the product id -> ${orderLines[i].productId} is not enough `
                );
              }
            } else {
              product.sizes[j].color[k].quantity -= orderLines[i].quantity;
            }
            break; // no need to continue when we find the color
          }
        }
        if (!colorFlag) {
          // if the color doesn't exist
          throw new Error(
            `The color ${orderLines[i].color} of the size ${orderLines[i].size} of the product id -> ${orderLines[i].productId} doesn't exist`
          );
        }
        break; // no need to continue when we find the size
      }
    }
    if (!sizeFlag) {
      // if the size doesn't exist
      throw new Error(
        `The size ${orderLines[i].size} of the product id -> ${orderLines[i].productId} doesn't exist`
      );
    }
    transaction.push(product);
  }
  transaction.forEach(async (pro) => {
    // save order as one transaction so if there was any error in the cart nothing could be happen in the db
    await pro.save();
  });
};
