// require("dotenv").config({path:"../.env"});
// console.log("product listing url",process.env.Mongo_URL)
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env")
});
console.log("product listing url", process.env.Mongo_URL);

let mongoose =require("mongoose");
mongoose.connect(process.env.Mongo_URL);
let Sch=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    images:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        match:[/^[0-9]+$/],
        min:1
    },
    stock:{
        type:Number,
        required:true,
        match:[/^[0-9]+$/],
        min:0
    },
    sizes:{
        type:[String],
        required:true,
        enum:["sm","md","lg","xl","2xl","3xl"]
    },
    category:{
        type:[String],
        required:true,
        enum:["simple","design"]
    },
    ProductId:{
        type:String,
        required:true,
        unique:true,
        match:[/^[a-zA-Z0-9]{8}$/] // Alphanumeric string of length 8 to 12
    }
});
let Model=mongoose.model("Products",Sch)

module.exports=Model;