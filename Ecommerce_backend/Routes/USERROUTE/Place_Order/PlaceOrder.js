let PlaceOrderDatabase = require("../../../Database/Place_Order.js");
let ProductDatabase = require("../../../Database/ProductListing.js");

let PlaceOrder=async(req,res)=>{
try{ 
     let UserID=req.user._id; //get user id if user is a logged in and it is come from a middleware 
    let {Size,Quantity,ProductID}=req.body;
    if(!Size||!Quantity||!ProductID){ //here product id is used to  identify product is order
    return    res.status(400).json({message:"plaase enter size and quantity"})
    }

    //fetch product price
    let product=await ProductDatabase.findById(ProductID).select("price");
    if(!product){
        return res.status(404).json({message:"Product not found"});
    }
    let TotalPrice = product.price * Quantity; //calculate total price
    let result=new PlaceOrderDatabase({
        Size,
        Quantity,
        UserID, //this is used to identify user 
        ProductID:ProductID, //this is used to identify product that which product is order
        TotalPrice, //this is used to store total price of the order
        PayementStatus:"Pending"
    });
result.OrderID=result._id.toString().substring(0,8); //generate short string to identify the order  or track the order
console.log("order id is :",result.OrderID);
console.log("user id is :",result.UserID);
console.log("total price : ",result.TotalPrice);
    let data=await result.save();
    console.log("data is store",data)
    res.status(200).json({data});
    console.log("so the PayementStatus is :",PayementStatus);
console.log("product id is :",result.ProductID);
}
catch(error){
    console.log("error is : " , error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
}
}
module.exports =PlaceOrder;