let ProductDatabase=require("../../Database/ProductListing.js");
let DisplayProductDetail=async(req,res)=>{
    try{
    let ProductDetail=await ProductDatabase.findById(req.params.id);
console.log(req.params.id);
res.status(200).json({ProductDetail});
    }

catch(error){
console.log(error);
res.status(500).json({message:"internal error",error})
}
}
module.exports=DisplayProductDetail