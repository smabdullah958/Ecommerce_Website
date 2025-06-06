require("dotenv").config({path:"../../.env"});
console.log(process.env.Mongo_URL)
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
        type:String,
        required:true,
        match:[/^[0-9]+$/],
        min:1
    },
    stock:{
        type:String,
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
    }
});
let Model=mongoose.model("Products",Sch)

module.exports=Model;