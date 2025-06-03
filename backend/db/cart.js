const mongoose=require("mongoose")
const cartschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
     productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        quantity:Number,
});
const Cart=mongoose.model("Cart",cartschema);
module.exports=Cart