let CardDatabase=require("../../../Database/Cart");
async function Delete_Product_From_Card(req,res){
    try{
    let UserID=req.user._id; //from middlewar
    let CardId=req.params.CardID; //from requst
    let DeleteItem=await CardDatabase.findOneAndDelete({
        _id:CardId,
        UserID:UserID //used for a user can only delete product from their own card
    })
    if(!DeleteItem){
        return res.status(404).json({message:"product is not delete"})
    }
    res.status(200).json({DeleteItem})
}
catch(error){
    console.log("internal error",error)
    res.status(500).json({message:"internal errro",error})
}
}
module.exports=Delete_Product_From_Card