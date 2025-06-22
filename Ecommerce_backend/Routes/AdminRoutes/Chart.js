    let Orders=require("../../Database/Place_Order")

let Chart=async(req,res)=>{
try{
let today=new Date();

//it means get data of a past fifteen day but aj k din include nahi hai 
let FifteenDayAgo=new Date();
//aj k din include nai hai
FifteenDayAgo.setDate(today.getDate()-15);

//end date (set time to end )
let yesterday=new Date();
yesterday.setDate(today.getDate()-1);
yesterday.setHours(23,59,59,999);


let result=await Orders.find(   { 
      createdAt:  {
           $gte:FifteenDayAgo,
            $lte:yesterday
        },
    })
.populate("ProductID","price title")
.select("Quantity ProductID createdAt");
res.status(200).json({result})
}
catch(error){
    console.log("erorr",error);
    res.status(500).json({message:"internal errro"})
}
}
module.exports = Chart;