let Cloudinary=require("cloudinary").v2
// require("dotenv").config({path:".env"});

require("dotenv").config({ path: require("path").resolve(__dirname, "./.env") });


Cloudinary.config({
    cloud_name:process.env.Cloud_Name,
    api_key:process.env.Cloud_API_Key,
    api_secret:process.env.Cloud_API_Secret
});
console.log("cloudinary secrets are ", process.env.Cloud_Name, process.env.Cloud_API_Key,process.env.Cloud_API_Secret)
module.exports=Cloudinary;