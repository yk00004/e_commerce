const mongoose=require("mongoose")
const wishschema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
});
const Wishlist=mongoose.model("Wishlist",wishschema);
module.exports=Wishlist