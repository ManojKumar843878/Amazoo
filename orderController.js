const orderModel = require('../Models/orderModel');
const productModel = require('../Models/productModel')
// create order - api/v1/order
exports.createOrders = async (req, res, next) => {
  console.log(req.body, "order received");

  const cartItems = req.body;

  const amount = Number(
    cartItems.reduce(
      (acc, item) => acc + item.product.price * item.qty,
      0
    )
  ).toFixed(2);

  const status = 'pending';

  const order = await orderModel.create({ cartItems, amount, status });

  // update product stock
  for (const item of cartItems) {

    const productId = item.product._id || item.product;
    const product = await productModel.findById(productId);

    if (!product) {
      console.log("Product not found:", productId);
      continue;
    }

    product.stock -= item.qty;
    await product.save();
  }

  res.json({
    success: true,
    message: 'Order placed successfully',
    order
  });
};
