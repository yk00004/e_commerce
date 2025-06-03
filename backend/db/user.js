const mongoose=require("mongoose")
const userschema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});
const User=mongoose.model("User",userschema);
module.exports=User