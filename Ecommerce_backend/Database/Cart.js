    require("dotenv").config({path:"../.env"});
    console.log(process.env.Mongo_URL)

    let mongoose=require("mongoose");
    mongoose.connect(process.env.Mongo_URL)

    let Schema=new mongoose.Schema({
        UserID:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SignUps"
        },
        ProductID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Products"   
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
            default:1
        },
        CardID:{
            type:String,
            required:true,
        },
        TotalPrice:{
            type:Number,
            required:true
        }
    },{
        timestamps:true
    })

    let model=mongoose.model("Cards",Schema)
    console.log("the model of a Card : ",model)
    module.exports=model;