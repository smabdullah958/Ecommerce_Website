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

ParentRoute.post("/",SignUpValidation,SignUpForm)
ParentRoute.post("/Login",LoginRoute);
ParentRoute.get("/LogOut",LogOutRoute);
ParentRoute.get("/checkLogin",checkLogin)
ParentRoute.get("/SEARCHING",Searching);
ParentRoute.post("/PlaceOrder",middleware,PlaceOrder);
ParentRoute.get("/DisplayPlaceOrder",DisplayPlaceOrder);
ParentRoute.get("/Search_Order",Search_Order)

module.exports=ParentRoute