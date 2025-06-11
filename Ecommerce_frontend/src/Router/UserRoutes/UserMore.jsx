import { useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

//for placeing order
import PlaceOrder from "./Features/Place_Orders/Place_Order";

function UserMore(){
    let {id}=useParams();
    let [product,setproduct]=useState(null);
    let [Loading,SetLoading]=useState(true);

     let [IsLoggedIn,setIsLoggedIn]=useState(null);
    let [Role,SetRole]=useState(null);


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
                //to check user is a login and also check role
             let checkLogin=async()=>{
            try{

            let response =await axios.get("http://localhost:5555/api/checkLogin", { withCredentials: true });
            if(response.data.isLoggedIn===true){
                setIsLoggedIn(true);
                SetRole(response.data.Role)  //store role
  console.log(response.data.Role);

            }
            else{
                setIsLoggedIn(false)
                SetRole(null);
                console.log(response.data.Role)
            }
        }
        catch(error){
            console.log("error",error)
        }}
            //to check user is loginand also check role
        checkLogin()
   

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
                            <img src={`http://localhost:5555/UploadItem/UploadPost/${product.images}`} alt={product.name}  className="   h-[70vh] sm:w-[70vw] lg:h-[85vh] w-[90vw]   rounded-t-xl   sm:ml-5 ml-3"  />)}
                            
                            <div className="grid pl-10 ">
                        <h2 className="text-2xl sm:text-4xl  font-bold text-gray-800 ml-5 mt-5 lg:mt-0  lg:mb-0 overflow-y-auto h-20 sm:max-w-[500px] max-w-[300px] overflow-x-hidden">
                                        {product.title}
                        </h2>
                        
                        <h2 className=" ml-5 my-5 lg:my-0 text-2xl font-semibold  ">
                                   Rs {product.price } 
                            </h2>


                                            {  (Role==="User"||Role===null)?
                                            <PlaceOrder IsLoggedIn={IsLoggedIn} ProductId={product._id}/>:null
                                            }                        
                                        

                        <p className="text-xl font-semibold   break-words pl-5 sm:max-w-[500px] max-w-[300px] overflow-y-auto h-20 ">
                   
                                                
                                    {product.description}
                        </p>



        </div>
        </div>
    )
}
export default UserMore;