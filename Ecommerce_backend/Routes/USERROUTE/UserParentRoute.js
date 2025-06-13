//this is a signupvalidation
let SignUpValidation=require("../../validation/SignUpValidation");



let express=require("express");

let ParentRoute=express.Router();

//this is a searching function
let Searching=require("./Searching")

const SignUpForm=require("./SignUpRoute");
const LoginRoute = require("./LoginRoute");
const LogOutRoute = require("./LogOutRoute");
const checkLogin = require("./CheckLogin");
let PlaceOrder=require("./Place_Order/PlaceOrder.js");
const middleware = require("./MiddleWare.js");
let DisplayPlaceOrder=require("./Place_Order/DisplayPlaceOrder.js");
const Search_Order = require("./Place_Order/Search_Order.js");
let DeliveryStatus=require("./Place_Order/UpdateDeliveryStatus.js");
let Add_To_Card=require("./Add_To_Card/Add_To_Card.js");
let Display_Add_To_Card=require("./Add_To_Card/Display_Add_To_Card.js")
let Delete_Product_From_Card=require("./Add_To_Card/Delete_Product_from_card.js")

ParentRoute.post("/",SignUpValidation,SignUpForm)
ParentRoute.post("/Login",LoginRoute);
ParentRoute.get("/LogOut",LogOutRoute);
ParentRoute.get("/checkLogin",checkLogin)
ParentRoute.get("/SEARCHING",Searching);
ParentRoute.post("/PlaceOrder",middleware,PlaceOrder);
ParentRoute.get("/DisplayPlaceOrder",DisplayPlaceOrder);
ParentRoute.get("/Search_Order",Search_Order)
ParentRoute.put("/UpdateDeliveryStatus/:OrderID",DeliveryStatus);
ParentRoute.post("/Add_To_Card",middleware,Add_To_Card)
ParentRoute.get("/Display_Add_To_Card",middleware,Display_Add_To_Card)
ParentRoute.delete("/Delete_Product_From_Card/:CardID",middleware,Delete_Product_From_Card)

module.exports=ParentRoute