require("dotenv").config({path:"../../../.env"})
let nodemailer=require("nodemailer");
let SetUpEmail=async(to,subject,htmlContent)=>{
    try{
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.My_Gmail, //admin gmail
                pass:process.env.App_Password //admin password
            }
        });
        let     info = await  transporter.sendMail({
            from :`Abdullah <${process.env.My_Gmail}>`,
            to ,
            subject,
            html:htmlContent,
        });
        console.log("email is send : ",info.messageId)
        return info
    }   
    catch(error){
        console.log("email is not send : ",error)
        return false
    }
}

module.exports=SetUpEmail