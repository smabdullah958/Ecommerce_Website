require("dotenv").config({path:"../../.env"})
let mongoose=require("../../Database/SignUp.js")

let JWT=require("jsonwebtoken");
let bcrypt=require("bcrypt")

 let LoginRoute=async(req,res)=>{
    try{
    let {Gmail,Password}=req.body
    if(!Gmail||!Password){
        return res.status(203).json({message:"all field must be field"})
    }
    let LOGIN=await mongoose.findOne({Gmail});
    if(!LOGIN){
        return res.status(401).json({error:"gmail is not found"})
    }

    let IsMatch=await bcrypt.compare(Password,LOGIN.Password) 
 if(!IsMatch){
    return res.status(300).json({error:"password is wrong"})
 }
 let Token=JWT.sign({
    Gmail,
    Role:LOGIN.Role},
    process.env.JWT_Password,
    {expiresIn:process.env.JWT_Expire});
    console.log("the role in a login",LOGIN.Role)
 console.log("here it is run")
 //set cookies
 res.cookie("Token",Token,{
    httpOnly:true,
    secure:false,
    maxAge:24*60*60*1000
 });
 console.log("login is work",Gmail,Password)
 res.status(200).json({message:"data is send",Token,Role:LOGIN.Role})
}
catch(error){
    console.log("error",error)
    res.status(500).json("not found")
}


}

module.exports=LoginRoute;