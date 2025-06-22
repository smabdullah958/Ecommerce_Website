require("dotenv").config({path:"../../../../.env"})
let SendEmail = require("../Add_To_Card/SetUpEmail.js")
let PlaceOrderDatabase = require("../../../Database/Place_Order.js");
 let CardDatabase = require("../../../Database/Cart.js");

let PlaceOrder=async(req,res)=>{
try{ 
//for placing oreder
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


 //it is for subtracting the order from a products stock 

 //here in this databse stock is present
 let productdatabase=require("../../../Database/ProductListing.js");

 //first find the product through id 
 let product= await productdatabase.findById(ProductID);
 
//to check product is exist or not 
 if(!product){
    return res.status({messae:"product is not find"})
 }
//check the user quantity if order quantity is greater than stocks than show error
 if(product.stock<Quantity){
    res.status(400).json({message:`we have only ${product.stock} items is available `})
 }
//subtract order from a stocks
 product.stock-=Quantity
//finaally save it
 await product.save();


 //fetch related data for a sending email

 const orderData = await PlaceOrderDatabase.findById(result._id)
      
     .select("OrderID Size Quantity createdAt TotalPrice deliveryStatus TcsId  ") //select only these fields
.populate("UserID","Name City Gmail PhoneNo Address") //fetch only lastname gmail,phoneno and address
.populate("ProductID"," price ProductId") //fetch only product name and price

// //email main contentt
// let htmlContent=`
// <h2>✅ Order Confirmation</h2>
// <p><strong>Tracking ID:${orderData.OrderID}</p>
// <p><strong>Tcs Tracking id :</strong> ${orderData?.TcsId || "not Assign yet"}</p>

// <p><strong>Quantity :</strong> ${orderData?.Quantity}</p>
// <p><strong>Size :</strong> ${orderData?.Size}</p>
// <p><strong>TotalPrice :</strong> ${orderData?.TotalPrice}</p>

// <p><strong>One piece price :</strong> ${orderData?.ProductID?.price}</p>



// <p><strong>Name : </strong> ${orderData.UserID?.Name}</p>
// <p><strong>City :</strong> ${orderData.UserID?.City}</p>
// <p><strong>Address :</strong> ${orderData.UserID?.Address}</p>
// <p><strong>ContactNo :</strong> ${orderData.UserID?.PhoneNo}</p>
// <p><strong>Gmail :</strong> ${orderData.UserID?.Gmail}</p>`;

// //this email is send to a user who place the order
// let sendingEmail=await SendEmail(orderData.UserID?.Gmail,`Order Confirmation-${orderData.OrderID}`,htmlContent);

let htmlContent = `
<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
  <h2 style="color: #4CAF50; text-align: center;">✅ Order Confirmation</h2>
  
  <p style="font-size: 16px;">Thank you for your order! Below are your order details:</p>

  <table style="width: 100%; margin-top: 15px; border-collapse: collapse;">
    <tr>
      <td style="padding: 8px;"><strong>🆔 Tracking ID:</strong></td>
      <td style="padding: 8px;">${orderData.OrderID}</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>📦 TCS Tracking:</strong></td>
      <td style="padding: 8px;">${orderData?.TcsId || "Not Assigned Yet"}</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>📏 Size:</strong></td>
      <td style="padding: 8px;">${orderData?.Size}</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>🔢 Quantity:</strong></td>
      <td style="padding: 8px;">${orderData?.Quantity}</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>💰 Total Price:</strong></td>
      <td style="padding: 8px;">${orderData?.TotalPrice}</td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>🧾 Price (Per Piece):</strong></td>
      <td style="padding: 8px;">${orderData?.ProductID?.price}</td>
    </tr>
  </table>

  <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;" />

  <h3 style="margin-bottom: 10px;">📍 Shipping Details:</h3>
  <p style="line-height: 1.6;">
    <strong>Name:</strong> ${orderData.UserID?.Name}<br/>
    <strong>City:</strong> ${orderData.UserID?.City}<br/>
    <strong>Address:</strong> ${orderData.UserID?.Address}<br/>
    <strong>Contact No:</strong> ${orderData.UserID?.PhoneNo}<br/>
    <strong>Email:</strong> ${orderData.UserID?.Gmail}
  </p>x

  <p style="text-align: center; color: #888; font-size: 14px; margin-top: 30px;">
    We'll notify you once your order has been dispatched. <br/>Thank you for shopping with us!
  </p>
</div>
`;



// //this email is send to a user who place the order
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
    // console.log("so email data is : ",sendingEmail)
    res.status(200).json({data});

console.log("product id is :",result.ProductID);
}
catch(error){
    console.log("error is : " , error);
    res.status(500).json({message:"Internal Server Error",error:error.message});
}
}
module.exports =PlaceOrder;