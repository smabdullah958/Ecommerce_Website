let ProductDatabase=require("../../../../Database/ProductListing");
let DisplayProduct=async(req,res)=>{
    try{
 console.log("dispalyproduct is working")
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