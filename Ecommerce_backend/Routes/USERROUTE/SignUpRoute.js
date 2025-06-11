//this is a array where error is collected
let {validationResult}=require("express-validator")
let bcrypt=require("bcrypt")

let mongoose=require("../../Database/SignUp.js")

let JWT=require("jsonwebtoken");


let SignUpForm=async(req,res)=>{
    try{
       
         console.log("hello how are you");
         let error=validationResult(req);
         if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
         }
        console.log("here authenidiacation si stater")

        let {Password,LastName,FirstName,Gmail,PhoneNo,Role,Address}=req.body;

                if(!Role){
            Role="User";
        }
        if(Gmail){
            let UserGmail=await mongoose.findOne({Gmail})
            if(UserGmail){
                return res.status(403).json({error:"Gmail is already exist"})
            }
        }


        // //for a authendication
        // let salt=await bcrypt.genSalt(10);
        // let hash=await bcrypt.hash(req.body.Password,salt);

        // OR
        
        let hash=await bcrypt.hash(Password,10);
        
        console.log("hash : ",hash)


    let data=new mongoose({
        FirstName,
        LastName,
        PhoneNo,
        Gmail,
        Password:hash,
       Address,
       Role
    });
    console.log("Password is : ", Password)
    console.log("here hash is nto only sfsakjl store in a database")
    let result=await data.save();
    console.log("here data is store in a database")
    let Token=JWT.sign({
        Gmail,_id:result._id,Role:Role},
        process.env.JWT_Password,
        {expiresIn:process.env.JWT_Expire});
    
    res.cookie("Token",Token,{
        httpOnly:true,
        secure:false,
        maxAge:24*60*60*1000
    });
    console.log("runing and role in a signuprole",result,Role);
        res.status(200).json(result);
    // res.send(result)
}
catch(err){
    res.status(500).json({error:err.message});
}
}

module.exports=SignUpForm