require("dotenv").config({path:".env"});
console.log(process.env.JWT_Password);
console.log(process.env.JWT_Expire);
let express=require("express");
let cors=require("cors") //for cross origin for frontend and backendd
let cookieParser=require("cookie-parser")
let App=express();
App.use(cookieParser())
App.use(express.json());
App.use(cors({
    origin:["http://localhost:5173","https://ecommerce-website-delta-beige.vercel.app"],
    credentials:true
}))
const UserParentRoute = require("./Routes/USERROUTE/UserParentRoute");
//hum different routes ko ek file mai rakh kr us ko import kr sakta hai
//this is for a user 
App.use("/api",UserParentRoute)

let AdminRoute=require("./Routes/AdminRoutes/AdminParentRoute")
//this is for a admin
App.use("/UploadItem",AdminRoute)
App.get("/",function(req,res){
    res.send({
        activeStatus:true,
        error:false
    })
})
App.listen(process.env.Port)