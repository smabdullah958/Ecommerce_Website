require("dotenv").config({path:"../ ../.env"}) //load environment variables from .env file
console.log("process.env in a middleware",process.env.JWT_Password); //log JWT secret for debugging purposes
let jwt=require("jsonwebtoken");
let middleware=async(req,res,next)=>{
    let  Token=req.cookies.Token; //get token from cookies
    if(!Token){
        return res.status(401).json({message:"Unauthorized, please login first"});
    }
    try{
        let decoded=jwt.verify(Token,process.env.JWT_Password); //verify token
        req.user=decoded; //store user data in request object
        next(); //call next middleware or route handler
    }
    catch(error){
        console.log("error is : " , error);
        res.status(401).json({message:"Invalid token, please login again"});
    }
}
module.exports=middleware; //export middleware function