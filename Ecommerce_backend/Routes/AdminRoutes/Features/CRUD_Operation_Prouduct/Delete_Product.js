let mongoose=require("../../../../Database/ProductListing");    

let DeleteProduct=async(req,res)=>{
try{
    let findId=req.params.id;
    let result=await mongoose.findOneAndDelete({_id:findId});
    if(!result){
        return res.status(404).json({message:"product is not found"})
    }
    console.log(result);
    res.status(200).json({message:"product is deleted ",result})
}
catch(error){
    console.log(error);
    res.status(500).json({message:"internal error"})
}
}
module.exports = DeleteProduct;
