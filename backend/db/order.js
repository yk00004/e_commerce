const mongoose=require("mongoose")
const orderschema=new mongoose.Schema({
    date:Date,
    items:Array(mongoose.Schema.Types.Mixed),
    paymentmode:String,
    address:mongoose.Schema.Types.Mixed,
    totalamount:Number,
    Status:String,
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
const Order=mongoose.model("Order",orderschema);
module.exports=Order