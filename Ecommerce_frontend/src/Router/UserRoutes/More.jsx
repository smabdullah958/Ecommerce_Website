import { useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

function More(){
    let {id}=useParams();
    let [product,setproduct]=useState(null);
    let [Loading,SetLoading]=useState(true);
    useEffect(()=>{
        let DisplayProductDetail=async()=>{
            try{
                let response=await axios.get(`http://localhost:5555/UploadItem/ProductDetail/${id}`)
                if(response.data){
                    setproduct(response.data.ProductDetail);
                    console.log(response.data.ProductDetail);
                    SetLoading(false)
                }
            }   
                catch(error){
                    console.log("it shwo rrror",error)
                }
                
            }
            DisplayProductDetail();
    },[id]);

        if(Loading){
                  return(
                <div className="flex justify-center justify-items-center h-[40vh]">
            <div className="animate-spin rounded-full h-36 w-36 border-b-4 border-blue-600"></div>
            </div>
        )}

    if(!product){
        return(
            <div className="text-center text-3xl">Product not found</div>
        )
    }        

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2   ">
                                    {product.images&&(
                            <img src={`http://localhost:5555/UploadItem/UploadPost/${product.images}`} alt={product.name}  className="   h-[70vh]  rounded-t-xl  mb-5 sm:ml-5 ml-3"  />)}
                            
                            <div className="grid ">
                        <h2 className="text-3xl font-bold text-gray-800 text-center truncate mb-5 lg:mb-0 ">
                                        {product.title}
                        </h2>
                        <p className="text-xl font-semibold text-gray-800  break-words pl-5 sm:max-w-[500px] max-w-[300px]">
                                    {product.description}
                        </p>
                                        </div>

                        <h2 className="pl-5 mt-5 text-xl font-semibold  ml-10">
                                    {product.price } Rs
                            </h2>
                       <h2 className="text-gray-600 text-xl pl-5 ml-10">
                                    {product.sizes.join(",")}
                        </h2>
                        <h2 className="text-gray-600 text-xl pl-5 ml-10">
                                    {product.stock}
                        </h2>

        </div>
    )
}
export default More;