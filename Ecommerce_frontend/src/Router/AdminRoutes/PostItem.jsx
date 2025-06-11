import { useNavigate } from "react-router";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

let ListingValidation=yup.object().shape({
title:yup.string().required("all field are mandatory"),
description:yup.string().required("all field are mandatory").max(4000,"max 4k character are allowed"),
//for images
images: yup.mixed()
  .test("required", "All fields are mandatory", (value) => {
  return value && value.length > 0
})
//for validate file size
  .test("fileSize", "File must be less than 500kb", (value) => {
    if (!value || value.length === 0) return false;
    return value[0]?.size <= 500 * 1024; // 500kb
  })
  
  //for validate file type
  .test("fileType", "Only JPEG, JPG, and PNG are allowed", (value) => {
    if (!value || value.length === 0) return false;
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(value[0]?.type);
  }),
price:yup.number().typeError("must be number").min(1,"minimum 1 is allowed").required("all fields are mandatory"),
stock:yup.number().typeError("must be number").min(1,"minimum 1 is allowed").required("all fields are mandatory"),
sizes:yup.array().of(yup.string()).required("all fields are mandatory").min(1,"at least one is required"),
category:yup.array().of(yup.string()).required("all fields are mandatory").min(1,"at least one is required"),
})

function PostItem(){
    let navigate=useNavigate()  

    let {
        register,
        handleSubmit,
        formState:{errors},
        
    }=useForm({
        resolver:yupResolver(ListingValidation),
        defaultValues:{
            category:[],
            sizes:[],
                    }
    });
    const PostItem = async (data) => {
        
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("stock", data.stock);
// Append each array element individually
  data.sizes.forEach((size) => formData.append("sizes[]", size)),
  data.category.forEach((category) => formData.append("category[]", category)),

  formData.append("images", data.images[0]); // 👈 this must match multer field name
console.log("form data = " ,data)

  try {
    const res = await axios.post("http://localhost:5555/UploadItem/PostItem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Upload Success:", res.data);
    alert("file is upload")
    navigate("/Home")
  } catch (error) {
    console.log("Upload Error:", error.response?.data?.error);
  }
};

    return(
        <div>

                    <h1 className='mb-4 sm:mb-7 sm:m-10 sm:text-3xl font-bold sm:ml-20 ml-10  text-3xl mt-2'>Product Listing</h1>
                    
                    <div className="flex justify-center  ">
                    
                        <form  className='grid grid-cols-1  sm:grid-cols-2  bg-slate-400 h-full sm:h-full xl:h-[50vw] 2xl:h-[60vh] w-[100vw] sm:w-[80vw] lg:w-[70vw] xl:w-[50vw]     sm:content-center justify-items-center  gap-0 p-3 py-5   sm:mb-5 xl:ml-0 overflow-x-hidden'>



                            <div>
                        {errors.title &&<p className="text-red-500">{errors.title.message}</p>}

                    <input {...register("title")} placeholder="Title" className=" lg:w-72 w-52  h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md"/>
</div>
 <div>                       
                        {errors.price&&<p className="text-red-500">{errors.price.message}</p>}
                    <input {...register("price")} placeholder="price" className=" lg:w-72 w-52  h-10 mb-2 sm:w-60 
                    mt-3 sm:mt-0 rounded-md"/>
</div>

<div>
                    {errors.stock&&<p className="text-red-500">{errors.stock.message}</p>}
                    <input {...register("stock")} placeholder="Stock " className=" lg:w-72 w-52  h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md"/>

</div>

        
                              <div className="mt-5 sm:mt-0">
                        {errors.images&&<p className="text-red-500">{errors.images.message}</p>}
                   <input type="file"  {...register("images")} className="lg:w-72 w-52 h-14 mb-2 sm:w-60 sm:mt-0 rounded-md ml-3 file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "/>
                        </div>

                        
<div className="sm:col-span-2 mb-2 pb-0">
                        {errors.description&&<p className="text-red-500">{errors.description.message}</p>}
                    <textarea {...register("description")} placeholder="description here" className=" lg:w-96 w-52   mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md  h-44 "/>
 </div>
                         
                             <div className="ml-6 w-64">

                                        {errors.category&&<p className="text-red-500">{errors.category.message}</p>}
                        
                                    <h1 className="text-xl font-bold mt-5 mb-1">Select Category</h1>

                        <label htmlFor="simple">simple</label>
                    <input type="checkbox" {...register("category")} className="m-2" value="simple" id="simple" />
                    
                    <label htmlFor="design">design</label>
                    <input type="checkbox" {...register("category")} className="m-2" value="design" id="design" />
                   </div>

                     <div className="ml-6 w-60 m-5 mb-1">
                                {errors.sizes&&<p className="text-red-500">{errors.sizes.message}</p>}
                            <h1 className="text-xl font-bold ">Select Size</h1>                           

                        <label htmlFor="sm">sm</label>
                    <input type="checkbox" {...register("sizes")} className="m-2" value="sm" id="sm" />
                    
                    <label htmlFor="md">md</label>
                    <input type="checkbox" {...register("sizes")} className="m-2 " value="md" id="md" />

                    <label htmlFor="lg">lg</label>
                    <input type="checkbox" {...register("sizes")} className="m-2 " value="lg" id="lg" />

                    <label htmlFor="xl">xl</label>
                    <input type="checkbox" {...register("sizes")} className="m-2 " value="xl" id="xl" />

                    <label htmlFor="2xl">2xl</label>
                    <input type="checkbox" {...register("sizes")} className="m-2 " value="2xl" id="2xl" />
                   
                   <label htmlFor="3xl" >3xl</label>
                    <input type="checkbox" {...register("sizes")} className="m-2 " value="3xl" id="3xl" />
                   </div>
      
                      
                         <button type="submit" onClick={handleSubmit((data)=>PostItem(data))} className='sm:col-span-2 border-2 border-black rounded-lg p-1 bg-slate-300 hover:bg-slate-400 transition-all duration-500 m-5 shadow-black shadow-md '> Listing</button>

            </form>
            </div>

            </div>
    )
}
export default PostItem