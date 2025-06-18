// require("dotenv").config({path:"../.env"})
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(process.env.Port,process.env.Mongo_URL)
const mongoose=require("mongoose");
mongoose.connect(process.env.Mongo_URL);

let schema=new mongoose.Schema({
    Name:{
        type:String,
        minlength:3,
        maxlength:50
    },
    City:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },
    Gmail:{
        type:String,
        unique:true,
        required:true,
        match:[/^[a-zA-Z0-9._%+-]+@gmail\.com$/],

    },
    Password:{
        type:String,
        required:true,
        minLength:5
        },
    PhoneNo:{
        type:String,
        required:true,
        match:[/^[0-9]{10}$/],
        
    },
    Role:{
        type:String,
        enum:["Admin","User"],
        default:"User"
    },
    Address:{
        type:String,
        required:true
    },
    PersonId:{
        type:String,
        required:true,
        unique:true,   
        match:[/^[a-zA-Z0-9]{8}$/] // Alphanumeric string of length 8 to 12
    }
});

console.log("data base is work")
let model=mongoose.model("SignUps",schema);

module.exports=model;