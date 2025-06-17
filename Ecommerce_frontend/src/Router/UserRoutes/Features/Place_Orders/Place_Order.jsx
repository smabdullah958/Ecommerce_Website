import { Toaster,toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router";
//here product id is used to identify that which product is begin order
function PlaceOrder({cartItem}){
    let Navigate=useNavigate();
   

   async function Order(){
toast.loading("placing your order ...."); 
    try{
        let response =await axios.post("https://ecommerce-website-backend-ob582n79j.vercel.app/api/PlaceOrder",{
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
    }
    }
    return (
         <div>
         <Toaster richColors position="top-center"/>
                 <button className="border-2 border-black rounded-md p-1  bg-gray-200  duration-500 transition-all shadow-gray-700 shadow-md  hover:bg-gray-300 cursor-pointer opacity-100"
                  onClick={Order}>
                     Place order
                    </button> 
        </div>
    )
}
export default PlaceOrder;