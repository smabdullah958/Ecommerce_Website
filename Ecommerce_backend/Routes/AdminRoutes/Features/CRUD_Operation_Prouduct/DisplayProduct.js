let ProductDatabase=require("../../../../Database/ProductListing.js");
let DisplayProduct=async(req,res)=>{
    try{
    let Product=await ProductDatabase.find();
console.log(Product)
res.status(200).json({message:"successfully display data",Product});
}
catch(error){
    console.log(error);
    res.status(500).json({error});
}
}
module.exports=DisplayProduct;