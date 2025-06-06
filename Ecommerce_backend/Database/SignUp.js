require("dotenv").config({path:"../../.env"})
console.log(process.env.Port,process.env.Mongo_URL)
const mongoose=require("mongoose");
mongoose.connect(process.env.Mongo_URL);

let schema=new mongoose.Schema({
    FirstName:{
        type:String,
        minlength:3,
        maxlength:50
    },
    LastName:{
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
    }
});

console.log("data base is work")
let model=mongoose.model("SignUps",schema);

module.exports=model;