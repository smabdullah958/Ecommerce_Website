import { useParams } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";

//for placeing order
// import PlaceOrder from "./Features/Place_Orders/Place_Order";
//for add a product ina  card
import Add_To_Card from "./Features/Place_Orders/Add_To_Card/Add_To_Card";

function UserMore(){
    let {id}=useParams();
    let [product,setproduct]=useState(null);
    let [Loading,SetLoading]=useState(true);
//to check login 
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
        <div className="grid grid-cols-1 lg:grid-cols-2  pb-5 ">
                                    {product.images&&(
                            <img src={`http://localhost:5555/UploadItem/UploadPost/${product.images}` } alt={product.name}  className=" size-80   sm:w-[80vw] lg:h-[85vh] sm:h-[60vh]    rounded-t-xl   sm:ml-5 ml-3"  />)}
                            



                            <div className="grid pl-10 ">
                        <h2 className="text-2xl sm:text-4xl  font-bold text-gray-800 ml-5 mt-5 lg:mt-0  lg:mb-0   sm:max-w-[500px] max-w-[300px] overflow-hidden  ">
                                        {product.title}
                        </h2>
                        
                        <h2 className=" ml-5 my-5 lg:my-0 text-2xl font-semibold  ">
                                   Rs {product.price } 
                            </h2>

                            
                        <h2 className=" ml-5 my-5 lg:my-0 text-2xl font-semibold  ">
                                   available Stocks : {product.stock } 
                            </h2>


                                            {/* {  (Role==="User"||Role===null)?
                                            <PlaceOrder IsLoggedIn={IsLoggedIn} ProductId={product._id}/>:null
                                            }                         */}

                                                {/* isLoggedIn is passed to check user is log in or not and product id is used that on which we click and alos pass the id  */}

                                                {(Role==="User"||Role===null)?
                                        <Add_To_Card IsLoggedIn={IsLoggedIn} ProductId={product._id} 
                                        stocks={product.stock} />:null
                                             }
                                             {/* stocks is passed becuase if a user want to order more products than the existing than it show error  */}


                        <p className="text-xl font-semibold   break-words pl-5 sm:max-w-[500px] max-w-[300px] overflow-y-auto h-20 ">
                   
                                                
                                    {product.description}
                        </p>



        </div>
        </div>
    )
}
export default UserMore;