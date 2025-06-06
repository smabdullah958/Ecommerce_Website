//this is a validation ofa  image and upload of a image
let path=require("path");
let multer=require("multer");
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.resolve(__dirname,"../../UploadPost"))
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname);
    },
})

//this is a for file type validation
const fileFilter=(req,file,cb)=>{
    let allowedFiletype=["image/jpg","image/png","image/jpeg"];
    if(!allowedFiletype.includes(file.mimetype)){
        return cb(new Error("invalid file type only png jpb and jpe is allowed"),false)
    }
    cb(null,true)
}

//this is for file type memory 
let upload =multer({
    storage,
    fileFilter,
    limits:{fileSize:500*1024} //500kb
});

//now this is export in a express   
module.exports=upload;