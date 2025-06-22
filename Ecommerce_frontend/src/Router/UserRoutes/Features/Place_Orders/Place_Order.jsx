import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
//here product id is used to identify that which product is begin order
function PlaceOrder({cartItem}){
    let Navigate=useNavigate();
    let [Loading,SetLoading]=useState(false)

   async function Order(){
        SetLoading(true)

    try{
        let response =await axios.post("http://localhost:5555/api/PlaceOrder",{
             Size:cartItem.Size,
            Quantity:cartItem.Quantity,
            ProductID:cartItem.ProductID._id,
            TotalPrice:cartItem.TotalPrice 
        },{
            withCredentials:true
        })  
        console.log(response.data);
        toast.success("Order place successfully");
        setTimeout(() => {
        Navigate("/")    
        }, 1000);
         
          
    }
    catch(error){
        console.log(" their is a error = ",error)
        if(error.response.status===400){
            toast.error(error.response.data.message)
        }
    }
    }
    return (
         <div>
                 <button className= {`border-2 border-black rounded-md p-1  bg-gray-200  duration-500 transition-all shadow-gray-700 shadow-md ${Loading ?"cursor-not-allowed opacity-30"
                 :" hover:bg-gray-300 cursor-pointer opacity-100"} `}
                  disabled={Loading}
                  onClick={Order}>

                     {Loading?"Process...":"Place order"}
                    </button> 
        </div>
    )
}
export default PlaceOrder;