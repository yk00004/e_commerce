const express = require("express");
const router = express.Router();
const cart = require("./../db/cart");

router.get("/", async (req, res) => {
  // console.log(req.user);
  let userid = req.user.id;
  let products = await cart.find({ userId: userid }).populate("productId");
  res.send(products);
});

router.post("/:id", async (req, res) => {
  let userid = req.user.id;
  let productid = req.params.id;
  let quantity = Number(req.body.quantity);

  const existingItem = await cart.findOne({
    userId: userid,
    productId: productid,
  });

  if (existingItem) {
    existingItem.quantity += quantity;
    const updated = await existingItem.save();
    return res.send(updated);
  }

  let product = new cart({
    userId: userid,
    productId: productid,
    quantity: quantity,
  });

  let ans = await product.save();
  res.send(ans);
});

router.put("/:id", async (req, res) => {
  let userid = req.user.id;
  let productid = req.params.id;
  let quantity = req.body.quantity;

  let product = await cart.findOneAndUpdate(
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

  let products = await cart.findOneAndDelete({
    userId: userid,
    productId: productid,
  });
  res.send(products);
});

module.exports = router;
