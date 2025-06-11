
import axios from "axios";
import { useState,useEffect } from "react";
import Order_Searching from "./Order_Searching";
let DisplayPlaceOrder=()=>{
    let [data,setData]=useState([]);
    let [loading,setLoading]=useState(true);
    useEffect(()=>{
        let fetchData=async()=>{
            try{
                let response=await axios.get("http://localhost:5555/api/DisplayPlaceOrder");
                if(!response.ok){
                console.error("error is occure");
                }
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


    return (
<div className="p-6 pt-0 "> 
{/* //SearchResult is pass that if we can search than it show on a UI without this it is change the UI */}
<Order_Searching SearchResult={setData} />

      <h1 className="text-center text-3xl font-bold mb-8">All Orders</h1>

      {data.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div key={item._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-2">
                <p className="text-sm text-gray-500">Order ID</p>
                <p className="font-bold text-gray-800">{item.OrderID}</p>
                <p className="text-sm text-gray-500">Created At : { new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="mb-2">
                <p className="text-sm text-gray-500">Size / Quantity</p>
                <p className="text-gray-700">{item.Size} / {item.Quantity}</p>
              </div>

              <div className="mt-4 border-t pt-3">
                <p className="font-semibold text-gray-700 mb-1">Customer</p>
                <p><span className="font-medium">Name:</span> {item?.UserID?.LastName || "N/A"}</p>
                <p><span className="font-medium">Email:</span> {item?.UserID?.Gmail || "N/A"}</p>
                <p><span className="font-medium">Phone:</span> {item?.UserID?.PhoneNo || "N/A"}</p>
                <p><span className="font-medium">Address:</span> {item?.UserID?.Address || "N/A"}</p>
              </div>

              <div className="mt-4 border-t pt-3">
                <p className="font-semibold text-gray-700 mb-1">Product</p>
                <p><span className="font-medium">Title:</span> {item?.OrderProduct?.title || "N/A"}</p>
                <p><span className="font-medium">Price:</span> RS {item?.OrderProduct?.price || "N/A"}</p>
                <p><span className="font-medium">Product ID:</span> {item?.OrderProduct?.ProductId || "N/A"}</p>
                {/* <p><span className="font-medium">Address : </span>{item?.OrderProduct?.Address||"N/A"}</p> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DisplayPlaceOrder;