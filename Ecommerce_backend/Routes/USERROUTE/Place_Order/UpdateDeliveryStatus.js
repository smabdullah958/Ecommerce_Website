let PlaceOrderDatabase = require("../../../Database/Place_Order.js");

let DeliveryStatus=async(req,res)=>{

    try{
        let OrderID=req.params.OrderID; //get order id from params
        let {deliveryStatus,TcsId}=req.body; //get delivery status from body
        if(!OrderID || !deliveryStatus){
            return res.status(400).json({message:"Please provide OrderID and delivery status"});
        }
        let result=await PlaceOrderDatabase.findOneAndUpdate(
            {OrderID:OrderID}, //find order by OrderID
            {$set:{
                deliveryStatus:deliveryStatus,
                TcsId:TcsId
            }}, //update delivery status
            {new:true} //return the updated document
        );
if(!result){
            return res.status(404).json({message:"Order not found"});
        }
    
    res.status(200).json({message:"Delivery status updated successfully",result});
    }
    catch(error){
        console.log("error is : " , error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }

}
module.exports = DeliveryStatus;