const express = require("express");
const Order = require("./order");
const Product = require("./product");

const router = express.Router();

// CREATE order & reduce stock
router.post("/", async (req, res) => {
  const { items } = req.body;
  let totalAmount = 0;

  for (let item of items) {
    const product = await Product.findById(item.productId);

    if (product.stock < item.qty) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    product.stock -= item.qty;
    totalAmount += product.price * item.qty;

    await product.save();
  }

  const order = new Order({
    items,
    totalAmount,
    status: "PLACED"
  });

  await order.save();
  res.json(order);
});

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;
