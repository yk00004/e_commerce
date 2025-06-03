const express = require("express");
const router = express.Router();
const order = require("./../db/order");
const cart = require("./../db/cart");

router.get("/", async (req, res) => {
  const  userId  = req.user.id;
  try {
    const orders = await order.find({ userId }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    // console.log(req.body.ordervalyu);
    const { item, paymentmode, address, date, totalamount } = req.body.ordervalyu;
    user=req.user.id;
    
    // Basic validation
    if (!item || !Array.isArray(item) || item.length === 0) {
      return res.status(400).json({ message: "Cart items are required." });
    }
    if (!paymentmode || !address || !totalamount) {
      return res.status(400).json({ message: "Missing order details." });
    }

    const newOrder = new order({
      items:item,
      paymentmode,
      address,
      totalamount,
      date: date || new Date(),
      Status: "Pending",
      userId:user,
    });
    // console.log(newOrder);
    
    const savedOrder = await newOrder.save();
    await cart.deleteMany({userId:req.user.id});
    res.status(201).json({
      message: "Order placed successfully.",
      order: savedOrder,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  let userid = req.user.id;
  let productid = req.params.id;
  let quantity = req.body.quantity;

  let product = await order.findOneAndUpdate(
    { userId: userid, productId: productid },
    { quantity:quantity},
    { new: true }
  );
console.log(product);

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  let userid = req.user.id;
  let productid = req.params.id;

  let products = await order.findOneAndDelete({
    userId: userid,
    productId: productid,
  });
  res.send(products);
});
module.exports = router;
