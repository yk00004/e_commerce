const express = require("express");
const app = express();
const mongoose = require("mongoose");

const categoryroute = require("./routes/category");
const brandroute = require("./routes/brand");
const productrouter = require("./routes/product");
const customerrouter =require("./routes/coustomer");
const authrouter=require("./routes/auth");
const Wishlistrouter = require("./routes/wishlist");
const cartrouter = require("./routes/cart");
const orderrouter = require("./routes/order");
const adminrouter = require("./routes/admin");

const cors = require("cors");
const { verifytoken, isAdmin } = require("./handler/auth-middlewere");
app.use(express.json());
app.use(cors());

async function dbconnect() {
  await mongoose.connect("mongodb://localhost:27017/ecom");
}
dbconnect()
  .then(console.log("db connected"))
  .catch((err) => {
    console.log("error in connect DB");
  });

app.use("/category", categoryroute);
app.use("/brand",brandroute);
app.use("/product", productrouter);
app.use("/customer",customerrouter);
app.use("/auth",authrouter);
app.use("/wishlist",verifytoken,Wishlistrouter);
app.use("/cart",verifytoken,cartrouter);
app.use("/order",verifytoken,orderrouter);
app.use("/admin",verifytoken,isAdmin,adminrouter);

app.listen(3000, () => {
  console.log("backend ON.3000 ");
});
