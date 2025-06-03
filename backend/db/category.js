const mongoose=require("mongoose")
const categoryschema=new mongoose.Schema({
    name:String,
});
const Category=mongoose.model("Category",categoryschema);
module.exports=Category