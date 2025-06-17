import axios from "axios"
import { useState } from "react"

import {Toaster , toast} from "sonner";
function TrackProduct(){
let [Search,SetSearch]=useState(null)
let [Result,SetResult]=useState(null)
let Track=async()=>{
    try{
        let response=await axios.get(`https://ecommerce-website-backend-ob582n79j.vercel.app/api/trackProduct/${Search}`)
            SetResult(response.data.Orderid) //Orderid is come froma a backend
            console.log("so the track is : ",response.data.Orderid)
            
        }
        catch(error){
            toast.error("invalid order id")
            console.log("their is a error : ",error)
        } 
    }


let handlekeydown=(e)=>{
    if(e.key==="Enter"){
        Track()
    }
}
return (
<div className="sm:overflow-y-hidden  bg-gray-100 min-h-[80vh]">
<div>
<Toaster position="top-center" richColors/>
        <input type="text" 
        placeholder="Search by OrderId" 
        onKeyDown={handlekeydown}
        onChange={(e)=>SetSearch(e.target.value)} className="text-xs sm:text-sm lg:text-md p-[5px]  ml-3 sm:ml-10 
        w-[65vw] rounded-xl border-2 border-black border-solid hover:bg-gray-200 transition duration-1000 mb-5 text-center"/>

        <button
        onClick={Track}
        className="w-14 ml-3 sm:p-2 bg-black text-white rounded-md hover:bg-gray-800"
      >
        Track
      </button>
      </div>
            {Result &&(
                <div className="  m-4 p-4 ">
                              <p><strong>Order ID:</strong> {Result.OrderID}</p>
          <p><strong>Quantity:</strong> {Result.Quantity}</p>
          <p><strong>Size:</strong> {Result.Size}</p>
          <p><strong>Total Price:</strong> {Result.TotalPrice}</p>
          <p><strong>Delivery Status:</strong> {Result.deliveryStatus}</p>
          <p><strong>TCS ID:</strong> {Result.TcsId||"Not Assign"}</p>
           <p><strong>Name:</strong> {Result.UserID?.Name}</p> 
          <p><strong>Gmail:</strong> {Result.UserID?.Gmail}</p>
          <p><strong>Contact NO:</strong> {Result.UserID?.PhoneNo}</p>
           <p><strong>City:</strong> {Result.UserID?.City}</p>
           <p><strong>Address:</strong> {Result.UserID?.Address}</p>     
                </div>
            )}
    </div>
    )
}
export default  TrackProduct