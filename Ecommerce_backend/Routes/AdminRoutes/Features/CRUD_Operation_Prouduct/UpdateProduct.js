let {validationResult}=require("express-validator");
let mongoose=require("../../../../Database/ProductListing");


let UpdateProduct=async(req,res)=>{
try{
    //handle validation error
        let error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({message:"theiris eror",error:error.array()})
}
console.log("no erorr");
         let {title,description,images,price,stock,sizes,category}=req.body;
    

    let findId=req.params.id;
    let updatefields={
        title,
        description,
        price,
        stock,
        sizes,
        category
    }   
    //check file is uplaod
    if(req.file){
    updatefields.images=req.file.filename;
    }

    let result=await mongoose.findOneAndUpdate(
        {_id:findId},{
        $set:updatefields    
    },{
        new:true
    }
) ;
    if(!result){
        return res.status(404).json({message:"here data is not updated"})
    }
    console.log(result)
    res.status(200).json(result);
}
catch(error){
    res.status(500).json({message:"internal error"})
}
 }
 module.exports = UpdateProduct;