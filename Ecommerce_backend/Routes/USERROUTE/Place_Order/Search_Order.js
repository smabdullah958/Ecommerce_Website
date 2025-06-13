// let mongoose = require("mongoose");
let PlaceOrderDatabase = require("../../../Database/Place_Order.js");

async function Search_Order(req,res){

    try{
        let {searchText}=req.query; //get order id and user id from query
        
        if(!searchText){ //if order id or user id is not present then return error
            return res.status(400).json({message:"Please provide OrderID and UserID"});
        }

            //regex is only used for a string not on object id
        let SearchCondition=[
            {

                OrderID: {$regex: searchText, $options: "i"} //search by order id
            }
        ];

    
        let result=await PlaceOrderDatabase.find({
            $or:SearchCondition
     }).populate("UserID").populate("ProductID"); //populate user id and product id to get the user and product details
        if(!result){ //if result is not found then return error
            return res.status(404).json({message:"Order not found"});
        }
        res.status(200).json({result});
    }
    catch(error){
        console.log("error is : " , error);
        res.status(500).json({message:"Internal Server Error",error:error.message});
    }

}
module.exports=Search_Order;