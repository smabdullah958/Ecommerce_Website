require("dotenv").config({path:"../.env"});
console.log(process.env.Mongo_URL)
let mongoose =require("mongoose");
mongoose.connect(process.env.Mongo_URL);
let Sch=new mongoose.Schema({
    OrderID:{  //this is used to identify the order or track the order
        type:String,
        required:true,
        unique:true,
},
Size:{
    type:String,
    required:true,
    enum:["sm","md","lg","xl","2xl","3xl"],
    default:"sm"
},
    Quantity:{
        type:Number,    
        required:true,
        match:[/^[0-9]+$/],
        min:1
    },
    UserID:{   //this is used to identify user that which user is order
        type:mongoose.Schema.Types.ObjectId,
        ref:"SignUps"
    },
    ProductID:{  //this is used to identify the product that which product is order
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },
    TotalPrice:{
        type:Number,
        required:true
    },
    deliveryStatus:{
        type:String,
        enum:["Pending","Packed","Shipped","Delivered"],
        default:"Pending" //default status is packed
    },
    TcsId:{
        type:String,
        default:null
    },
    PayementStatus:{
        type:String,
        default:"Pending",
        enum:["Pending","Recieve"] 
    }
},{
        timestamps:true //this is used to store the created at and updated at time
   }); 
   let Model=mongoose.model("Place_Orders",Sch);
console.log("Database is wordking in a Place_Order",Model)
   module.exports=Model; 

