const express=require("express")
const router=express.Router()
const Product=require("./../db/product")

router.get("/",async(req,res)=>{
    let ans= await Product.find({})
    res.send(ans)
})
router.post("/",async(req,res)=>{
    let category=req.body;
    let addProduct=new Product({
        ...category
    });
    let ans= await addProduct.save()
    res.send(ans.toObject())
})

router.put("/:id",async(req,res)=>{
    let category=req.body;
    await Product.findByIdAndUpdate({_id:req.params.id},{...category})
    res.send({message:"updated"})
})
router.get("/:id",async(req,res)=>{
    let category=req.params;
    let ans= await Product.findById(category.id)
    res.send(ans)
    
})
router.delete("/:id",async(req,res)=>{
    await Product.findByIdAndDelete(req.params.id)
    res.send({message:"deleted"})
})

module.exports=router