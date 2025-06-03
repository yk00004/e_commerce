const mongoose=require("mongoose")
const brandchema=new mongoose.Schema({
    name:String,
});
const Brand=mongoose.model("Brand",brandchema);
module.exports=Brand