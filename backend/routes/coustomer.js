const express = require("express");
const router = express.Router();
const Product = require("./../db/product");
const Category = require("./../db/category");
const Wishlist = require("./../db/wishlist");
router.get("/feature-product", async (req, res) => {
  let ans = await Product.find({ facheredproduct: true });
  res.send(ans);
});
router.get("/isnew-product", async (req, res) => {
  let ans = await Product.find({ isnewproduct: true });
  res.send(ans);
});
router.get("/categories", async (req, res) => {
  let ans = await Category.find({});
  res.send(ans);
});
router.get("/products", async (req, res) => {
  const searchTerm = req.query.search || "";
  const categoryId = req.query.categoryId;
  const brandId = req.query.brandId;
  const sort = req.query.sort; // expects 'price_asc' or 'price_desc'

  // console.log(
  //   `Search: ${searchTerm}, Category: ${categoryId}, Brand: ${brandId}, Sort: ${sort}`
  // );

  let query = {};

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: "i" } },
      { shortDescription: { $regex: searchTerm, $options: "i" } },
      { Description: { $regex: searchTerm, $options: "i" } },
    ];
  }

  if (categoryId) {
    query.CategoryId = categoryId;
  }

  if (brandId) {
    query.brandId = brandId;
  }

  // Build sort option
  let sortOption = {};
  if (sort === "price_asc") {
    sortOption = { Price: 1 }; // ascending
  } else if (sort === "price_desc") {
    sortOption = { Price: -1 }; // descending
  }

  try {
    const products = await Product.find(query)
      .populate("CategoryId")
      .populate("brandId")
      .sort(sortOption);
    // console.log(products);

    res.send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
