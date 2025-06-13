
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router";

function Add_To_Card({IsLoggedIn,ProductId}){

    let Navigate=useNavigate()
     async function AddProduct(){
        try{
            
            let response=await axios.post("http://localhost:5555/api/Add_To_Card",{
                Size:Order.Size,
                Quantity:Order.Quantity,
                ProductID:ProductId
            },{
        withCredentials:true
    })  
    console.log(response.data);
    alert("product is added") 
Navigate("/Display_Add_To_Card")
}
        
        catch(error){
            console.log("error is occur in a add to card : ",error)
        }
    }

  
    let [Order,SetOrder]=useState({
        Quantity:1,
        Size:"sm"
    })

  
return (
    <div>
            <select className="p-2 mb-3 w-[50vw] bg-gray-200 hover:bg-gray-300 transition duration-1000 rounded-lg border-2 border-black border-solid lg:w-72   " value={Order.Size} onChange={(e)=>{
                SetOrder({
                    ...Order,
                    Size:e.target.value
                })
            }}>
                <option value="sm">Sm</option>
                <option value="md">md</option>
                <option value="lg">Lg</option>
                <option value="xl">xl</option>
                <option value="2xl">2xl</option>
                <option value="3xl">3xl</option>
            </select>
            <br/>
            <button onClick={(e)=>{
                SetOrder({
                ...Order,
                Quantity:Order.Quantity+1
                })
            }} className="border-2 border-black rounded-md p-1  bg-gray-200  duration-500 tranition-all shadow-gray-500 shadow-md hover:bg-gray-300    opacity-100 size-10 mr-2">
            +</button>
            <span className="text-xl font-bold">  
                    {Order.Quantity}    
                            </span>
                       
            <button onClick={(e)=>{
                SetOrder({
                ...Order,
                Quantity:Order.Quantity-1
                })
            }} className="border-2 border-black rounded-md p-1  bg-gray-200  duration-500 tranition-all shadow-gray-400 shadow-md hover:bg-gray-300   opacity-100 size-10 ml-2">-</button>
<br/><br/>

<button onClick={AddProduct} className={`w-[50vw] lg:w-72  border-2 border-black rounded-md p-2   bg-gray-200  duration-500 transition-all shadow-gray-700  shadow-md ${ IsLoggedIn?"bg-gray-200 hover:bg-gray-300 cursor-pointer opacity-100":"bg-gray-50 cursor-not-allowed opacity-10"}
            `} >
                     Add to Cart
                    </button>

    </div>
)
}
export default Add_To_Card