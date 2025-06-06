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

ParentRoute.post("/",SignUpValidation,SignUpForm)
ParentRoute.post("/Login",LoginRoute);
ParentRoute.get("/LogOut",LogOutRoute);
ParentRoute.get("/checkLogin",checkLogin)
ParentRoute.get("/SEARCHING",Searching);

module.exports=ParentRoute