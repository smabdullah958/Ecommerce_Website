let {body}=require("express-validator");
let ProductValidation=[
    body("title").notEmpty().withMessage("all fields are mandatory"),
    body("description").notEmpty().isLength({max:4000}).withMessage("max character is 4000"),
    body("stock").notEmpty().matches(/^[0-9]+$/).isLength({min:1}).withMessage("stock is in number"),
    body("price").notEmpty().matches(/^[0-9]+$/).isLength({min:1}).withMessage("price is need"),
     body("sizes").isArray().notEmpty().isIn(["sm","md","lg","xl","2xl","3xl"]).withMessage("size is in array"),
        body("category").isArray().notEmpty().isIn(["simple","design"])
];
module.exports=ProductValidation;