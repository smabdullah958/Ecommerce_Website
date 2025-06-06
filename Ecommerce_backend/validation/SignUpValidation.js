//thisis i a validation
let {body}=require("express-validator");
let SignUpValidation=[
    body("FirstName").isLength({min:3,max:50}).withMessage("first name is required"),
    body("LastName").notEmpty().isLength({min:3,max:50}).withMessage("last name should be between 3 to 50 character"),
    body("Gmail").isEmail().matches(/^[a-zA-Z0-9.%+-]+@gmail\.com$/).notEmpty().withMessage("Gmail is reuired"),
    body("Password").notEmpty().isLength({min:5}).withMessage("Password is required"),
    body("PhoneNo").notEmpty().matches(/^[0-9]{10}$/).withMessage("Phone Number is required"),
    body("Address").notEmpty().withMessage("Address is required"),
    body("Role").isIn(["Admin","User"]).default("User").optional()
]
module.exports=SignUpValidation;
