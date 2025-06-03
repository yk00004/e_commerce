const mongoose=require("mongoose");

const productschema=new mongoose.Schema({
    name:String,
    shortDescription:String,
    Description:String,
    Price:Number,
    discount:Number,
    Images:Array(String),
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Brand",
    },
    facheredproduct:Boolean,
    isnewproduct:Boolean
});
module.exports= Product=mongoose.model("Product",productschema);
