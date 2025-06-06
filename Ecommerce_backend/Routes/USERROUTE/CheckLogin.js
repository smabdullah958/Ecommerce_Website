let jwt=require("jsonwebtoken")
async function CheckLogin(req,res){
try{
    let Token=req.cookies.Token;
    if(!Token){
        return res.json({isLoggedIn:false})
    }
    const decode = jwt.verify(Token, process.env.JWT_Password);
console.log({Role:decode.Role},"and role in a checklogin")
    return res.json({ isLoggedIn: true, Role: decode.Role || "User" }); // Add role if needed

}
catch(error){
    console.log(error)
     res.status(500).json({message:"internal erro"})
}
}
module.exports=CheckLogin;