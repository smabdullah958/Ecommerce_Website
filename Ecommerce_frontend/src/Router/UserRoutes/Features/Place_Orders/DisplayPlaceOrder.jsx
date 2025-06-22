import AOS from 'aos';
import 'aos/dist/aos.css';

import axios from "axios";
import { useState,useEffect } from "react";
import Order_Searching from "./Order_Searching";
import DeliveryStatus from "./UpdateDeliveryStatus";
let DisplayPlaceOrder=()=>{
    let [data,setData]=useState([]);
    let [loading,setLoading]=useState(true);
    // here when i click on a update button than selectoreder contain the order id whose update button is click
    let [SelectedOrder,SetSelectedOrder]=useState(null)

    //for scrolling
    useEffect(() => {
  AOS.init({
    duration: 800, // animation duration
    once: true     // animate only once
  });
}, []);

    useEffect(()=>{
        let fetchData=async()=>{
            try{
                let response=await axios.get("http://localhost:5555/api/DisplayPlaceOrder");
                
                 setData(response.data.result);
                console.log("data is",response.data);
            }catch(error){
                console.error("Fetch error:",error);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    },[]);
    if(loading){
            return(
                <div className="flex justify-center justify-items-center h-[40vh]">
            <div className="animate-spin rounded-full h-36 w-36 border-b-4 border-blue-600"></div>
            </div>
        );}
// to find a length of a pending status order
        let pendingCount = data.filter(order => order.deliveryStatus === "Pending").length;


    return (
<div className="p-6 pt-0 bg-gradient-to-tr from-slate-200 to-slate-100  "> 
{/* //SearchResult is pass that if we can search than it show on a UI without this it is change the UI */}
<div className=" flex flex-wrap">
<Order_Searching SearchResult={setData}  />
<p className="ml-4 font-bold text-lg sm:font-extrabold sm:text-2xl"> total Orders {data.length}</p>
<p className="ml-4 font-bold text-lg sm:font-extrabold sm:text-2xl"> pending order {pendingCount}</p>
                              
     </div>
      <h1 className="text-center text-3xl font-bold mb-8">All Orders</h1> 

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div 
            data-aos="fade-up"
            key={item._id} 
            className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-2">
                 <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold text-gray-800">{item.OrderID}</p>
                 <p className="text-sm text-gray-500">Tcs ID :<span className="font-bold">{item.TcsId||"Not Assign"}</span></p>

                <p className="text-sm text-gray-500">Created At : { new Date(item.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 font-bold">Status : {item.deliveryStatus}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Size / Quantity</p>
                <p className="text-gray-700">{item.Size} / {item.Quantity}</p>
              </div>

              <div className="mt-4 border-t pt-3">
                <p className="font-semibold text-gray-700 mb-1">Customer</p>
                <p><span className="font-medium">UserID:</span> {item?.UserID?.PersonId || "N/A"}</p>
                <p><span className="font-medium">Name:</span> {item?.UserID?.Name || "N/A"}</p>
                <p><span className="font-medium">Email:</span> {item?.UserID?.Gmail || "N/A"}</p>
                <p><span className="font-medium">Phone:</span> {item?.UserID?.PhoneNo || "N/A"}</p>
                <p><span className="font-medium">City:</span> {item?.UserID?.City || "N/A"}</p>
                <p><span className="font-medium">Address:</span> {item?.UserID?.Address || "N/A"}</p>
              </div>

              <div className="mt-4 border-t pt-3">
                <p className="font-semibold text-gray-700 mb-1">Product</p>
                <p><span className="font-medium">Title:</span> {item?.ProductID?.title || "N/A"}</p>
                <p><span className="font-medium">Price:</span> RS {item?.ProductID?.price || "N/A"}</p>
                <p><span className="font-medium">Product ID:</span> {item?.ProductID?.ProductId || "N/A"}</p>
                 <p className="text-sm text-gray-500 font-bold">Total price : {item.TotalPrice}</p>
                    <button type="submit" onClick={()=>SetSelectedOrder(item)} className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200 transition duration-500"> update Status</button>   

                          </div>
            </div>  
          ))}
        </div>
      )}
      {/* //here if Selected Order is true than it is show the Updatae deivery  */}
      {SelectedOrder && <DeliveryStatus Order={SelectedOrder} onClose={()=>SetSelectedOrder(null)} />}
    </div>
  );
};
export default DisplayPlaceOrder;