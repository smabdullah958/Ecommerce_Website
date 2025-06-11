let {body}=require("express-validator");
let ProductValidation=[
    body("title").notEmpty().withMessage("all fields are mandatory"),
    body("description").notEmpty().isLength({max:4000}).withMessage("max character is 4000"),
    body("stock").isNumeric().notEmpty().matches(/^[0-9]+$/).isLength({min:1}).withMessage("stock is in number"),
    body("price").isNumeric().notEmpty().matches(/^[0-9]+$/).isLength({min:1}).withMessage("price is need"),
     body("sizes").isArray().notEmpty().isIn(["sm","md","lg","xl","2xl","3xl"]).withMessage("size is in array"),
        body("category").isArray().notEmpty().isIn(["simple","design"]),
        // body("ProductId").notEmpty().matches(/^[a-zA-Z0-9]{6}$/).isLength({max:6}).withMessage("product id is alphanumeric string of length 6"),
];
module.exports=ProductValidation;