const Order = require('../Order/Order.model')
const Product = require('../Product/Product.model')

exports.newOrder = async (req, res) => {
  //place order (only tailor and user can place orders)
  // if (req.user.type === 'vendor')
  //   throw new Error('Please signup as a user or a tailor')

  const orderLine = await Order.create(req.body)
  updateInventory(req.body)
  res.staus(200).json(orderLine)
}

updateInventory = (products) => {}
