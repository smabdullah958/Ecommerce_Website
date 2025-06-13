let CardDatabase=require("../../../Database/Cart")
let Display_Add_To_Card =async(req,res)=>{
try{
    //userid is used for a authendication that one user can not access the products of a another which it is add to a card
    let userid=req.user._id;
    let data= await CardDatabase.find({UserID:userid}).
    select("Quantity Size TotalPrice")
    .populate("ProductID","title price description images ");
if(!data){
    return res.status(404).json({message:"product is not found"})
}

res.status(200).json({message:"order is place",data})
console.log("data is a ",data)
}
catch(error){
    console.log("erro is occur during the display",error)
    res.status(500).json({message:"internal error"})
}
}
module.exports = Display_Add_To_Card