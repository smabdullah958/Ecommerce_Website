//for deleting file from a local system
fs=require("fs")


//for cloudinary
let cloudinary=require("../../../../Cloudinary_Config");

let {validationResult}=require("express-validator");
let ProductDatabase=require("../../../../Database/ProductListing")


let ProductPost=async (req,res)=>{
    try{
//handle validation error
        let error=validationResult(req);
if(!error.isEmpty()){
    return res.status(400).json({message:"theiris eror",error:error.array()})
}
console.log("no erorr");
        let {title,description,images,price,stock,sizes,category}=req.body;
    //check file is uplaod
    if(!req.file){
        return res.status(400).json({message:"file is required"});
    }
        //upload to a cloudinary
        let img=await cloudinary.uploader.upload(req.file.path,{
            folder:"T_Shirts"  //this is a folder name which is present ina  cloudinary
        });
            //for deleteing image form  local system
        fs.unlinkSync(req.file.path)

    let data=new ProductDatabase({
        title,
        description,
        images:img.secure_url,       //save image url
        price,
        stock,
        sizes:req.body["sizes[]"]||req.body.sizes,
        category:req.body["category[]"]||req.body.category
    });
    console.log("data is correct",req.file);
    //generate short string to identify the product
    data.ProductId=data._id.toString().substring(0,8);
    let result=await data.save();
    console.log("product id is = ",result.ProductId);
    res.status(200).json({message:"correct api",result});
    console.log(data)
} 
catch(err){
    console.log(err)
    res.status(500).json({message:"internal error"})
}
}
module.exports=ProductPost;
