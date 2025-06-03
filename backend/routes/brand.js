const express=require("express")
const router=express.Router()
const Brand=require("./../db/brand")


router.get("/",async(req,res)=>{
    let ans= await Brand.find({})
    res.send(ans)
    
})

router.post("/",async(req,res)=>{
    let category=req.body;
    let addbrand=new Brand({
        name:category.name
    });
    let ans= await addbrand.save()
    res.send(ans.toObject())
})
router.get("/:id",async(req,res)=>{
    let category=req.params;
    let ans= await Brand.findById(category.id)
    res.send(ans)
    
})
router.put("/:id",async(req,res)=>{
    let category=req.body;
    await Brand.findByIdAndUpdate({_id:req.params.id},{name:category.name})
    res.send({message:"updated"})
})
router.delete("/:id",async(req,res)=>{
    let ans=await Brand.findByIdAndDelete(req.params.id)
    res.send({message:"deleted"})
})

module.exports=router;