require("dotenv").config({path:"../../.env"});
console.log(process.env.Mongo_URL,process.env.Mongo_URL);
let mongoose=require("mongoose");
mongoose.connect(process.env.Mongo_URL);
let Sch=new mongoose.Schema({
    OrderID:{
        type:Number,
        required:true,
        unique:true,
},
size:{
    type:String,
    required:true,
    enum:["sm","md","lg","xl","2xl","3xl"]
},
    quantity:{
        type:Number,    
        required:true,
        match:[/^[0-9]+$/],
        min:1
    },
    Gmail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SignUps"
    }
   }); 
   let Model=mongoose.model("Place_Orders",Sch);
console.log("Database is wordking",Model)
   module.exports=Model; 

