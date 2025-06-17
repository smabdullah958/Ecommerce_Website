import { Toaster,toast } from "sonner";
import axios from "axios";
import { useEffect, useState  } from "react";

// order contain order id 
function DeliveryStatus({Order,onClose}){
let [UpdateStatus,SetUpdateStatus]=useState({
    TcsId:null,
    deliveryStatus:"Pending"
})

useEffect(()=>{
    if(Order){
        SetUpdateStatus({
            TcsId:Order.TcsId||"",
            deliveryStatus:Order.deliveryStatus||"Pending"
        })
    }
},[Order])

   async function UpdateStatusAndId(){
try{
    let response= await axios.put(`https://ecommerce-website-backend-ob582n79j.vercel.app/api/UpdateDeliveryStatus/${Order.OrderID}`,{
      TcsId:UpdateStatus.TcsId,
      deliveryStatus:UpdateStatus.deliveryStatus  
    });
    if(response.status===200){
        toast.success("status is update");
       setTimeout(() => {
        onClose()
       }, 1000);
        
    }
}
catch(error){
    console.log("error is their is n a update status", error)
}
}
return(
<div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <Toaster richColors position="top-center"/>
     
    <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-[80vh] h-[70vh] sm:h-[60vh] ">
        <div className="text-2xl font-bold grid sm:grid-cols-2 grid-cols-1  ">
        <p className="mb-4 sm:mb-0">Order:{Order.OrderID}</p>         
        Status:{Order.deliveryStatus}
        </div>
            

<div className="flex flex-col items-center">

<label>Tcs ID</label>

<input type="text" value={UpdateStatus.TcsId} onChange={(e)=>{
SetUpdateStatus({

    ...UpdateStatus,
    TcsId:e.target.value
})  
}} className=" lg:w-72 w-[60vw] h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md mr-3 bg-gray-200 hover:bg-gray-100 duration-500 transition" placeholder="update Tcs Id"/>
<br/>
<label>Delivery Status</label>
<select value={UpdateStatus.deliveryStatus} className=" lg:w-72 w-[60vw] h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md mr-3 bg-gray-200 hover:bg-gray-100 duration-500 transition" onChange={(e)=>{
SetUpdateStatus({

    ...UpdateStatus,
    deliveryStatus:e.target.value
})  
}} >    
    <option value="Packed">Packed</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
</select>

<br/>
</div>
<p className="flex justify-evenly">
<button type="submit" onClick={UpdateStatusAndId} className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-500" >Update</button>


<button onClick={onClose} className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-500" >Close</button>
</p>
    </div>
</div>
)


}
export default DeliveryStatus;