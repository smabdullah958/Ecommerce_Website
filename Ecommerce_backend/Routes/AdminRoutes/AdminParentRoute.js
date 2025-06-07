let path=require("path")
//multer to uplaod file
let upload=require("./multer");
//for validation
let ProductValidation=require("../../validation/ProductListingValidation")
let DisplayProduct=require("./DisplayProduct");
let DeleteProduct=require("./Delete_Product");

//this is fro a function 
let ProductPost=require("./ProductPost");

let express=require("express");
const DisplayProductDetail = require("./DisplayProductDetail"); 
const UpdateProduct = require("./UpdateProduct");
let AdminRoute=express.Router();
//it is used for a uploading picture of a item
AdminRoute.use("/UploadPost",express.static(path.join(__dirname,"../../UploadPost")));
//it is for a picture uploading product
AdminRoute.post("/PostItem",upload.single("images"),ProductValidation,ProductPost);
//it is for display
AdminRoute.get("/DisplayProduct",DisplayProduct)
AdminRoute.get("/ProductDetail/:id",DisplayProductDetail);

//it is for update product and here middleware is for  a upload image and also validation 
AdminRoute.put("/UpdateProduct/:id",upload.single("images"),ProductValidation,UpdateProduct);

//for delete product
AdminRoute.delete("/DeleteProduct/:id",DeleteProduct);

module.exports=AdminRoute;
