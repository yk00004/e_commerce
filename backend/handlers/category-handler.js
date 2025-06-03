const Category=requuire("./../db/category.js")

async function addcategory(body1) {
    let addcategory=new Category({
        name:body1.name
    });
    let ans= await addcategory.save()
    return ans.toObject()
}
async function updatecategory(category) {
    await Category.findByIdAndUpdate({_id:req.params.id},{name:category.name})
    return 
}

module.exports={addcategory,updatecategory}