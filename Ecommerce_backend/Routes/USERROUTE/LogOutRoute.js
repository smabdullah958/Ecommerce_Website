function LogOut(req,res){
try{
res.clearCookie("Token",{
    
    httpOnly:true,
    secure:false,
  
})
console.log("logout successfully");
res.status(200).json("succcessfully")

}
catch(error){
    console.log("error",error);
    res.status(500).json("internal eror")

}
}
module.exports=LogOut