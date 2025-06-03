const express=require("express")
const router=express.Router()
const Category=require("./../db/category")


router.get("/",async(req,res)=>{
    
    let ans= await Category.find({})
    let ans2=ans.map(c=>c.toObject())
    res.send(ans2)
    
})

router.post("/",async(req,res)=>{
    let category=req.body;
    let addcategory=new Category({
        name:category.name
    });
    let ans= await addcategory.save()
    res.send(ans.toObject())
})
router.get("/:id",async(req,res)=>{
    let category=req.params;
    let ans= await Category.findById(category.id)
    // let ans2=ans.map(c=>c.toObject())
    res.send(ans)
    
})
router.put("/:id",async(req,res)=>{
    let category=req.body;
    await Category.findByIdAndUpdate({_id:req.params.id},{name:category.name})
    res.send({message:"updated"})
})
router.delete("/:id",async(req,res)=>{
    let ans=await Category.findByIdAndDelete(req.params.id)
    res.send({message:"deleted"})
})

module.exports=router