let PlaceOrderDatabase = require("../../../Database/Place_Order.js");
function generateOrderID() {
    return Math.floor(Math.random() * 1000000); // Generates a random 6-digit number
}


let PlaceOrder=async(req,res)=>{
try{
    let UserID=req.user._id; //get user id if user is a logged in 
    let {size,quantity}=req.body;
    if(!size||!quantity){
        res.status(400).json({message:"plaase enter size and quantity"})
    }
    let result=new PlaceOrderDatabase({
        OrderID:generateOrderID(), //for generate a random order id
        size,
        quantity,
        Gmail:UserID
    });

    let data=await result.save();
    console.log("data is store",data)
    res.status(200).json({data});
}
catch(error){
    console.log("error is : " , error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
}
}
module.exports =PlaceOrder;