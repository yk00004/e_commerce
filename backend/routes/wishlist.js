const express = require("express");
const router = express.Router();
const Wishlist = require("./../db/wishlist");

router.get("/", async (req, res) => {
    // console.log(req.user);
    
  let userid = req.user.id;
  let products = await Wishlist.find({ userId: userid }).populate("productId");
  res.send(products);
});
router.post("/:id", async (req, res) => {
    console.log(req.user);
  let userid = req.user.id;
  
  let productid = req.params.id;

  console.log(productid);
  let product = new Wishlist({
    userId: userid,
    productId: productid,
  });
  console.log(product);
  
  let ans = await product.save();
  res.send(ans);
});
router.delete("/:id", async (req, res) => {
  let userid = req.user.id;
  let productid = req.params.id;

  let products = await Wishlist.findOneAndDelete({
    userId: userid,
    productId: productid,
  });
  res.send(products);
});
module.exports = router;
