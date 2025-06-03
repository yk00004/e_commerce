const express = require("express");
const router = express.Router();
const Order = require("../db/order");

// 🔹 GET all orders (Admin Panel)
router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "username email").sort({ date: -1 });
    // console.log(orders);
    
    res.send(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 PUT update order status
router.put("/order/:id", async (req, res) => {
  try {
    const  {status}  = req.body;
    const validStatuses = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }
    console.log(status);
    console.log(req.params.id);
    
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { Status:status },
      { new: true }
    );
    console.log("asdff"+updatedOrder);
    
    if (!updatedOrder) return res.status(404).json({ error: "Order not found" });

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 🔹 DELETE an order
router.delete("/order/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) return res.status(404).json({ error: "Order not found" });

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
