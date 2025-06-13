let PlaceOrderDatabase = require("../../../Database/Place_Order.js");

let  DisplayPlaceOrder=async(req,res)=>{

    try{
    let result=await PlaceOrderDatabase.find()
.select("OrderID Size Quantity createdAt TotalPrice deliveryStatus TcsId PayementStatus ") //select only these fields
.populate("UserID","Name City Gmail PhoneNo Address PersonId") //fetch only lastname gmail,phoneno and address
.populate("ProductID","title price ProductId") //fetch only product name and price

console.log("result is :",result);
    if(result.length===0){
        return res.status(404).json({message:"No orders found"});
    }
    res.status(200).json({result});
    }

catch(error){
    console.log("error is : " , error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
}
}
module.exports = DisplayPlaceOrder;