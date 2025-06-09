let path=require("path")
//multer to uplaod file
let upload=require("./multer");
//for validation
let ProductValidation=require("../../validation/ProductListingValidation")
let DisplayProduct=require("./Features/CRUD_Operation_Prouduct/DisplayProduct");
let DeleteProduct=require("./Features/CRUD_Operation_Prouduct/Delete_Product");

//this is fro a function 
let ProductPost=require("./Features/CRUD_Operation_Prouduct/ProductPost");

let express=require("express");
const DisplayProductDetail = require("./DisplayProductDetail"); 
const UpdateProduct = require("./Features/CRUD_Operation_Prouduct/UpdateProduct");
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
