require("dotenv").config({path:"../../../../.env"})
let SendEmail = require("../Add_To_Card/SetUpEmail.js")
let PlaceOrderDatabase = require("../../../Database/Place_Order.js");
 let CardDatabase = require("../../../Database/Cart.js");

let PlaceOrder=async(req,res)=>{
try{ 
     let UserID=req.user._id; //get user id if user is a logged in and it is come from a middleware 
    let {ProductID,Quantity,Size,TotalPrice}=req.body;
    if(!ProductID||!Quantity||!Size||!TotalPrice){ //here product id is used to  identify product is order
    return    res.status(400).json({message:"plaase enter size and quantity"})
    }

    let result=new PlaceOrderDatabase({
        Size,
         Quantity,
        UserID, //this is used to identify user 
        ProductID:ProductID, //this is used to identify product that which product is order
         TotalPrice, //this is used to store total price of the order
        // PayementStatus:"Pending"
    });
result.OrderID=result._id.toString().substring(0,8); //generate short string to identify the order  or track the order
console.log("order id is :",result.OrderID);
console.log("user id is :",result.UserID);
 console.log("total price : ",result.TotalPrice);

 let data=await result.save();


 //fetch related data for a sending email

 const orderData = await PlaceOrderDatabase.findById(result._id)
      
     .select("OrderID Size Quantity createdAt TotalPrice deliveryStatus TcsId  ") //select only these fields
.populate("UserID","Name City Gmail PhoneNo Address") //fetch only lastname gmail,phoneno and address
.populate("ProductID"," price ProductId") //fetch only product name and price


let htmlContent=`
<h2>✅ Order Confirmation</h2>
<p><strong>Tracking ID:${orderData.OrderID}</p>
<p><strong>Tcs Tracking id :</strong> ${orderData?.TcsId || "not Assign yet"}</p>

<p><strong>Quantity :</strong> ${orderData?.Quantity}</p>
<p><strong>Size :</strong> ${orderData?.Size}</p>
<p><strong>TotalPrice :</strong> ${orderData?.TotalPrice}</p>

<p><strong>One piece price :</strong> ${orderData?.ProductID?.price}</p>



<p><strong>Name : </strong> ${orderData.UserID?.Name}</p>
<p><strong>City :</strong> ${orderData.UserID?.City}</p>
<p><strong>Address :</strong> ${orderData.UserID?.Address}</p>
<p><strong>ContactNo :</strong> ${orderData.UserID?.PhoneNo}</p>
<p><strong>Gmail :</strong> ${orderData.UserID?.Gmail}</p>`;

//this email is send to a user who place the order
let sendingEmail=await SendEmail(orderData.UserID?.Gmail,`Order Confirmation-${orderData.OrderID}`,htmlContent);

//now the email is send to a admin that new order is place
let AdminEmail=process.env.My_Gmail;
let adminSubject = `🛒 New Order Placed - ${orderData.OrderID}`;
await SendEmail(AdminEmail,adminSubject,htmlContent);

    let deleteItem=await CardDatabase.findOneAndDelete({
        UserID,
        ProductID,
        Size
    });
    console.log("Prodcut is delete from card ",deleteItem)
    console.log("data is store",data)
    console.log("so email data is : ",sendingEmail)
    res.status(200).json({data});

    // console.log("so the PayementStatus is :",PayementStatus);
console.log("product id is :",result.ProductID);
}
catch(error){
    console.log("error is : " , error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
}
}
module.exports =PlaceOrder;