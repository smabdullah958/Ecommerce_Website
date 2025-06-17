import {toast} from "sonner"

// import { useParams } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";



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



let UpdateForm=({Close,ProductId,Product})=>{
    let {
        register,
        handleSubmit,
        setValue,
        formState:{errors},
        
    }=useForm({
        resolver:yupResolver(ListingValidation),
        defaultValues:{
            category:[],
            sizes:[],
                    }
    });

    useEffect(()=>{
      if(Product){
      setValue("title",Product.title);
      setValue("description",Product.description);
      setValue("stock",Product.stock);
      setValue("price",Product.price);
      setValue("sizes",Product.sizes);
       setValue("category",Product.category)

    }
  },[Product,setValue])


    async function UpdateFunction(data){
        
let formData=new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("stock", data.stock);
// Append each array element individually
        data.sizes.forEach((sizes) => formData.append("sizes[]", sizes));
        data.category.forEach((category) => formData.append("category[]", category));

        if(data.images &&data.images[0]){
          formData.append("images",data.images[0]); //only append when a image is new inserted
        }

console.log("form data = " ,formData)
  
        

       try{

          
           let response= await axios.put(`https://ecommerce-website-backend-ob582n79j.vercel.app/UploadItem/UpdateProduct/${ProductId}`, formData,
            {
               headers:{
                 "Content-Type":"multipart/form-data"
               }
             }
           );

           console.log(response.data)
           toast.success("Status is updated")
          setTimeout(() => {
           Close(); 
            
          }, 2000);
           
         }
        catch(error){
              console.log("so error = ",error)
        
            }
    };
    

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">

                {/* Dark Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-50" onClick={Close}></div>

            
            {/* Modal Content */}
            <div className="relative bg-gray-100  rounded-lg shadow-lg z-50 xl:w-[50vw] lg:w- sm:w-[80vw]  w-[100vw] h-[90vh]
             sm:h-[90vh]"> 
            <div >

                    <h1 className='mb-4   text-3xl font-bold sm:ml-20 ml-10   mt-2'>Update Item
                    </h1>
                    <form className="grid  grid-cols-2  ml-3">

                                          <div>
                        {errors.title &&<p className="text-red-500">{errors.title.message}</p>}

                    <input {...register("title")} placeholder="Title" className=" lg:w-72 w-[40vw] h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md mr-3"/>
              </div>

                  <div className="row-span-3 mb-2 pb-0">
                        {errors.description&&<p className="text-red-500">{errors.description.message}</p>}
                    <textarea {...register("description")} placeholder="description here" className="     mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md  h-40 w-[40vw]   "/>
                             </div>

               <div>                       
                        {errors.price&&<p className="text-red-500">{errors.price.message}</p>}
                    <input {...register("price")} placeholder="price" className=" lg:w-72 w-[40vw]  h-10 mb-2 sm:w-60 
                    mt-3 sm:mt-0 rounded-md"/>
</div>

<div>
                    {errors.stock&&<p className="text-red-500">{errors.stock.message}</p>}
                    <input {...register("stock")} placeholder="Stock " className=" lg:w-72 w-[40vw]  h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md"/>

</div>

        
                              <div className="mt-5 sm:mt-0">
                        {errors.images&&<p className="text-red-500">{errors.images.message}</p>}
                   <input type="file"  {...register("images")} className=" lg:w-72 w-[40vw] sm:w-60 sm:mt-0 rounded-md  file:mr-4 file:py-2 file:px-4
               file:rounded-full file:border-0 file:text-sm file:font-semibold
               file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 "/>
                        </div>

                             <div className="ml-6 w-[40vw] sm:w-64">

                                        {errors.category&&<p className="text-red-500">{errors.category.message}</p>}
                        
                                    <h1 className="text-xl font-bold  mb-1 mt-4 sm:mt-0">Select Category</h1>

                        <label htmlFor="simple">simple</label>
                    <input type="checkbox" {...register("category")} className="m-2" value="simple" id="simple" />
                    
                    <label htmlFor="design">design</label>
                    <input type="checkbox" {...register("category")} className="m-2" value="design" id="design" />
                   </div>

                     <div className="col-span-2  ml-5 mb-1">
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

</form>

            </div>
            <div className="text-center">           
             <button onClick={Close} className="border-2 border-black rounded-md p-1  bg-gray-200 hover:bg-gray-400 duration-500 tranition-all ml-3 shadow-black shadow-md ">Close</button>

            <button type="submit" onClick={handleSubmit((data)=>UpdateFunction(data))} className="border-2 border-black rounded-md p-1  bg-gray-200 hover:bg-gray-400 duration-500 tranition-all ml-3 shadow-black shadow-md">Update</button>
        </div>
        </div>

        </div>
    )
}
export default UpdateForm