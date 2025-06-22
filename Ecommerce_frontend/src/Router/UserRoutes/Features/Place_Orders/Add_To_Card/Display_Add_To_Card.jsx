import AOS from 'aos';
import 'aos/dist/aos.css';


import Delete_Product_from_card from "./Delete_From_add_to_card"
import axios from "axios";
import { useState,useEffect } from "react";
import Place_Order from "../../Place_Orders/Place_Order.jsx"
//import CheckOut from "./CheckOut";
function Display_Add_To_Card(){
    let [OrderProduct,SetOrderProducts]=useState([]);
    let [Loading,SetLoading]=useState(true)
    //it is used when we click on a place to order than only once it show the toast
    let [ToastShow,SetToastShow]=useState(false)
    async function fetchAddToCard(){
        try{
            let response=await axios.get("http://localhost:5555/api/Display_Add_To_Card",{
                withCredentials:true
            })
            console.log("order is send with a : ",response.data.data)
            SetOrderProducts(response.data?.data||[])
    }
    catch(error){
        console.log("error is occur  :  ",error)
    }
    finally{
        SetLoading(false)
    }
    }
    useEffect(()=>{
            fetchAddToCard()
    },[])


        //for scrolling
    useEffect(() => {
  AOS.init({
    duration: 800, // animation duration
    once: true     // animate only once
  });
}, []);


    return (
    <div className="min-h-screen bg-gray-100 p-6 ">
      <h1 className="text-3xl font-bold text-center mb-8"
      >🛒 Your Cart <span className="whitespace-nowrap "> ({OrderProduct.length} items) </span>

      </h1>

      {Loading ? (
        <div className="text-center text-lg font-medium">
        Loading cart items...
        </div>
      ) : OrderProduct.length === 0 ? (
        <div className="text-center text-gray-500">
        Your cart is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {OrderProduct.map((item, index) => (
  <div key={index}
   data-aos="flip-left"
   className="bg-white p-6 rounded-xl shadow-md">
    {/* <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Details</h2> */}



      <img
  src= {`http://localhost:5555/UploadItem/UploadPost/${item?.ProductID?.images}`}
  alt="Product"
  className="size-40 sm:size-60  object-cover rounded mb-4"
/>

    
    <div className="space-y-2">
      <p>
        <span className="font-medium">Price:</span> {item.ProductID?.price}
      </p>

      <p>
        <span className="font-medium">Size:</span> {item.Size}
      </p>
      <p>
        <span className="font-medium">Quantity:</span> {item.Quantity}
      </p>
      <p>
        <span className="font-medium">Total Price:</span> Rs {item.TotalPrice}
      </p>
      <p className="flex justify-between"> 
      {/* after deleting the page is automatically update with the hlep ofa  refetch */}
        <Delete_Product_from_card CardID={item._id}  />
      
      {/* <CheckOut/> */}
      <Place_Order cartItem={item} refetch={fetchAddToCard}  />
      </p>
    </div>
  </div>
))}

        </div>
      )}
    </div>
  );
}

export default Display_Add_To_Card;