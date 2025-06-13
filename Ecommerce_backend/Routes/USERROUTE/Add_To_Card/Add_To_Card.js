let ProductDatabase=require("../../../Database/ProductListing")

let CardDatabase=require("../../../Database/Cart");
let Add_To_Card=async(req,res)=>{
try{
         let UserID=req.user._id; //get user id if user is a logged in and it is come from a middleware 

    let {ProductID,Quantity,Size}=req.body;

    let Product=await ProductDatabase.findById(ProductID).populate("price")
        if(!Product){
            return res.status(404).json({"message":"product is not found"})
        }
    
    let TotalPrice=Product.price*Quantity;    
        console.log("total price is a : ", TotalPrice)

//if exist than update;
let exist=await CardDatabase.findOne({UserID,ProductID,Size})
if(exist){
    exist.Quantity+=Quantity 
    let data=await exist.save();
        return res.status(200).json({message:"value is updated",data})
}
//if not exist
let result=new  CardDatabase({
    Size,
    Quantity,
    UserID,
    ProductID,
    TotalPrice
})
result.CardID=result._id.toString().substring(0,8);
console.log("new card id is : ",result.CardID)
let data=await result.save();
        console.log("total price is a : ", result.TotalPrice)
res.status(200).json({message:"product is save ",data})
}
catch(error){
    console.log("error is occur : ",error)
}
}
module.exports=Add_To_Card