let Place_Order=require("../../Database/Place_Order");
async function TrackProduct(req,res){
    try{
let {OrderId}=req.params;
    let Orderid=await Place_Order.findOne({OrderID:OrderId})
    .select("OrderID Size Quantity TotalPrice deliveryStatus TcsId")
    .populate("UserID","Name City Gmail PhoneNo  Address");
        if(!Orderid){
            return res.status(400).json('invalid OrderID')
        }
        res.status(200).json({message:"Order is Found ",Orderid})
}
catch(error){
    console.log("their is error in a tracking ",error)
}
}
module.exports = TrackProduct