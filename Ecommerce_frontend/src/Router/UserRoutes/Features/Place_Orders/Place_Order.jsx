import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
//here product id is used to identify that which product is begin order
function PlaceOrder({IsLoggedIn,ProductId}){
    const [Quantity,SetQuantity]=useState(1);
    let [Size,SetSize]=useState("sm");
    let Navigate=useNavigate();
   

   async function Order(){
try{
        let response =await axios.post("http://localhost:5555/api/PlaceOrder",{
            Size:Size,
            Quantity:Quantity,
            ProductID:ProductId 
        },{
            withCredentials:true
        })
        console.log(response.data);
        alert("Order is uploaded")
         Navigate("/")
    }
    catch(error){
        console.log(" their is a error = ",error)
    }
    }
    return (
        <div>
              <select value={Size}  onChange={(e)=>SetSize(e.target.value)} className="p-2 mb-3 w-[50vw] bg-gray-200 hover:bg-gray-300 transition duration-1000 rounded-lg border-2 border-black border-solid lg:w-72   ">
                <option value="sm" >sm</option>
                <option value="md" >md</option>
                <option value="lg" >lg</option>
                <option value="xl" >xl</option>
                <option value="2xl">2xl</option>
                <option value="3xl">3xl</option>
              </select>
              <br/>
              <button onClick={()=>SetQuantity(Quantity+1)} className="border-2 border-black rounded-md p-1  bg-gray-200  duration-500 tranition-all shadow-black shadow-md mt-3 mb-5 hover:bg-gray-300   opacity-100 size-10">+</button>
                {Quantity}
                <button onClick={()=>SetQuantity(Quantity-1)} className="border-2 border-black rounded-md p-1  bg-gray-200  duration-500 tranition-all shadow-blue-200 shadow-md hover:bg-gray-300   opacity-100 size-10">-</button>
                <br/>
                 <button className={`border-2 border-black rounded-md p-1  bg-gray-200  duration-500 transition-all shadow-gray-700 shadow-md ${ IsLoggedIn?"bg-gray-200 hover:bg-gray-300 cursor-pointer opacity-100":"bg-gray-50 cursor-not-allowed opacity-10"}
            `} onClick={Order}>
                     Add to Cart
                    </button> 
        </div>
    )
}
export default PlaceOrder;