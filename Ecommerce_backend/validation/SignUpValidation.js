//thisis i a validation
let {body}=require("express-validator");
let SignUpValidation=[
    body("Name").notEmpty().isLength({min:3,max:50}).withMessage(" name is required"),
    body("City").notEmpty().isLength({min:3,max:50}).withMessage("city is required"),
    body("Gmail").isEmail().matches(/^[a-zA-Z0-9.%+-]+@gmail\.com$/).notEmpty().withMessage("Gmail is required"),
    body("Password").notEmpty().isLength({min:5}).withMessage("Password is required"),
    body("PhoneNo").notEmpty().matches(/^[0-9]{10}$/).withMessage("Phone Number is required"),
    body("Address").notEmpty().withMessage("Address is required"),
    body("Role").isIn(["Admin","User"]).default("User").optional()
]
module.exports=SignUpValidation;
