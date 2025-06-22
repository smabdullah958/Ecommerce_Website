// import AOS from 'aos';
// import 'aos/dist/aos.css';

// import UpdateForm from "../../Forms/UpdatePostForm";

// import {Link,useNavigate } from "react-router-dom";
// import axios from "axios";
// import Searching from "./Searching";
// import { useEffect, useState } from "react";
//  import LoginButton from "../../Buttons/LoginButton";
//  import LogOut from "../../Buttons/LogOut";
// import Delete from "../../Buttons/DeleteButton";
// import Update from "../../Buttons/UpdatePostButton"

// function AllProduct(){

//     //for product id to find and updated
// let [SelectedProductId,SetSelectedProductId]=useState(null)

// //for sending the whole product for prefilling the update
// let [SelectedProduct,SetSelectedProduct]=useState(null);

//     let [ShowForm,SetShowForm]=useState(false)
//        let [Loading,SetLoading]=useState(true);
//     let [Product,SetProduct]=useState([])
// let Navigate=useNavigate()
//      let [IsLoggedIn,setIsLoggedIn]=useState(null);
//     let [Role,SetRole]=useState(null);



//     //for scrolling
//     useEffect(() => {
//   AOS.init({
//     duration: 800, // animation duration
//     once: true     // animate only once
//   });
// }, []);



//  //her we display the whole product
//  useEffect(()=>{
//     let checkLogin=async()=>{
//             try{

//             let response =await axios.get("http://localhost:5555/api/checkLogin", { withCredentials: true });
//             if(response.data.isLoggedIn===true){
//                 setIsLoggedIn(true);
//                 SetRole(response.data.Role)  //store role
//   console.log(response.data.Role);

//             }
//             else{
//                 setIsLoggedIn(false)
//                 SetRole(null);
//                 console.log(response.data.Role)
//             }
//         }
//         catch(error){
//             console.log("error",error)
//         }}

//     let DisplayProduct=async()=>{
//         try{
//         let response=await axios.get("http://localhost:5555/UploadItem/DisplayProduct");
//         console.log(response.data);
//         if(response.data){
//             //.Product is come forma a backend because in this object the real product is present
//             SetProduct(response.data.Product)
//         }
//     }
//     catch(error){
//         console.log("error",error)
//     }
//     finally{
//         SetLoading(false)
//     }
// }

// checkLogin()
//         DisplayProduct();
//         },[]);

//         //it is used for a redirectional
//         useEffect(()=>{
//             if(IsLoggedIn===true && Role==="Admin"){
//                 Navigate("/Home");
//             }
//             if(IsLoggedIn===true && Role==="User"){
//                 Navigate("/");
//             }
//         },[IsLoggedIn,Role])



//         if(Loading){
//             return(
//                 <div className="flex justify-center justify-items-center h-[40vh]">
//             <div className="animate-spin rounded-full h-36 w-36 border-b-4 border-blue-600 mt-10"></div>
//             </div>
//         );}

//     return(

        

// <div >



// {/* //this is for show the update form */}
// {ShowForm && <UpdateForm Close={() =>
//  SetShowForm(false)}
//  ProductId={SelectedProductId} //her we pass the id of the product to update
//  Product={SelectedProduct} //here we pass the full product for prefiilling the updated form
//  />}
// {/* here role is passed for searchin with the help ofa  ProductId */}
//  <Searching    SetProduct={SetProduct} Role={Role}  />
//  <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 px-6 py-6   overflow-x-hidden">


//  <section className="flex justify-end gap-4 ">


//             {Role!=="Admin" &&
//             <LoginButton IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//             }

//             <LogOut  IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} Role={Role} SetRole={SetRole}/>





//          </section>

// <div>
//     {/* if searching is fail */}
// {
//  Product.length === 0 && (
//     <div className="text-center text-gray-600 text-xl my-10">
//       Product not found
//     </div>
//   )
// }

// </div>

//              <section className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-y-6  mt-6 overflow-hidden    max-w-[100%] max-h-[auto]">
//                 {
//                     Product.map((product,index)=>(
//                          <section
//                          data-aos="zoom-out" 
//                          className={`hover:scale-105 transition-transform duration-500 w-full  mx-auto my-3 pb-2 ${Role==="Admin"?"rounded-xl shadow-xl bg-white h-full":""} `} key={index} 
//                          style={{maxWidth:"220px"}}> 

                        
//                         {product.images&&(
//                             <img src={`http://localhost:5555/UploadItem/UploadPost/${product.images}`} alt={product.name}  className="h-48 w-full object-cover rounded-t-xl  "  />)}

//                             <div className="bg-white">
//                             <h2 className="text-xl font-bold text-gray-800 pl-5 truncate ">
//                                         {product.title}
//                         </h2>

//                             <h2 className="pl-5  text-lg  font-semibold ">
//                                      RS {product.price }
//                             </h2>

//                         {(Role==="User"||Role===null) &&
//                          <Link to={`/More/${product._id}`} 
//                          className="ml-5 mt-2 inline-block px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-md  hover:from-indigo-600 hover:to-blue-600 transition-all duration-500  mb-5 "
// >More</Link>
//                         }
//                         {Role==="Admin"&&
//                         <Link to={`/AdminMore/${product._id}`} 
//                         className="ml-5 mt-2 inline-block px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full shadow-md  hover:from-indigo-600 hover:to-blue-600 transition-all duration-500  mb-5 "

//                         >More</Link>}

//                         {
//                             Role==="Admin"&& (
//                                 <div className="grid grid-cols-2 justify-items-center">

//                             <Update onClick={()=>{
//                                 SetShowForm(true);
//                                 SetSelectedProductId(product._id);    //for product id to find and updated
//                                 SetSelectedProduct(product)            //for sending the whole product for prefilling the update
//                             }



//                             }/>
//                             <Delete ProductId={product._id}/> {/*  for delete product by id  */}
//                             </div>
//                             )
//                         }
// </div>

//                         </section>
//                     ))
//                 }

//             </section>

//         </div>

//       </div>

//     )

//             }
// export default AllProduct


import AOS from 'aos';
import 'aos/dist/aos.css';

import UpdateForm from "../../Forms/UpdatePostForm";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Searching from "./Searching";
import { useEffect, useState } from "react";
import LoginButton from "../../Buttons/LoginButton";
import LogOut from "../../Buttons/LogOut";
import Delete from "../../Buttons/DeleteButton";
import Update from "../../Buttons/UpdatePostButton";

function AllProduct() {
  const [SelectedProductId, SetSelectedProductId] = useState(null);
  const [SelectedProduct, SetSelectedProduct] = useState(null);
  const [ShowForm, SetShowForm] = useState(false);
  const [Loading, SetLoading] = useState(true);
  const [Product, SetProduct] = useState([]);
  const [IsLoggedIn, setIsLoggedIn] = useState(null);
  const [Role, SetRole] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get("http://localhost:5555/api/checkLogin", { withCredentials: true });
        if (response.data.isLoggedIn === true) {
          setIsLoggedIn(true);
          SetRole(response.data.Role);
        } else {
          setIsLoggedIn(false);
          SetRole(null);
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    const DisplayProduct = async () => {
      try {
        const response = await axios.get("http://localhost:5555/UploadItem/DisplayProduct");
        if (response.data) {
          SetProduct(response.data.Product);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        SetLoading(false);
      }
    };

    checkLogin();
    DisplayProduct();
  }, []);

  useEffect(() => {
    if (IsLoggedIn === true && Role === "Admin") Navigate("/Home");
    if (IsLoggedIn === true && Role === "User") Navigate("/");
  }, [IsLoggedIn, Role]);

  if (Loading) {
    return (
      <div className="flex justify-center items-center h-[40vh]">
        <div className="animate-spin rounded-full h-36 w-36 border-b-4 border-indigo-600 mt-10"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#e0f2f1] to-[#f3e5f5] min-h-screen px-3 py-6 overflow-x-hidden">
      {ShowForm && (
        <UpdateForm
          Close={() => SetShowForm(false)}
          ProductId={SelectedProductId}
          Product={SelectedProduct}
        />
      )}

      <Searching SetProduct={SetProduct} Role={Role} />

      <section className="flex justify-end gap-4 mb-6">
        {Role !== "Admin" && <LoginButton IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        <LogOut IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} Role={Role} SetRole={SetRole} />
      </section>

      {Product.length === 0 && (
        <div className="text-center text-gray-600 text-xl my-10">Product not found</div>
      )}

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Product.map((product, index) => (
          <div
            data-aos="zoom-in-up"
            key={index}
            className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 p-3 relative ${Role === "Admin" ? "border border-indigo-200" : ""}`}
          >
            {product.images && (
              <img
                src={`http://localhost:5555/UploadItem/UploadPost/${product.images}`}
                alt={product.name}
                className="h-64 w-full object-cover rounded-xl mb-4"
              />
            )}

            <h2 className="text-xl font-bold text-gray-800 truncate mb-1 px-2">{product.title}</h2>
            <h3 className="text-lg font-semibold text-indigo-600 px-2">Rs {product.price}</h3>

            {(Role === "User" || Role === null) && (
              <Link
                to={`/More/${product._id}`}
                className="mt-3 ml-2 inline-block w-[80%] text-center text-white text-sm font-medium bg-indigo-500 hover:bg-indigo-600 transition-colors duration-300 py-2 rounded-full shadow-md"
              >
                View More
              </Link>
            )}

            {Role === "Admin" && (
              <>
                <Link
                  to={`/AdminMore/${product._id}`}
                  className="mt-3 ml-2 inline-block w-[80%] text-center text-white text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-colors duration-300 py-2 rounded-full shadow-md"
                >
                  View More
                </Link>

                <div className="grid grid-cols-2 mt-3 gap-2 px-2">
                  <Update
                    onClick={() => {
                      SetShowForm(true);
                      SetSelectedProductId(product._id);
                      SetSelectedProduct(product);
                    }}
                  />
                  <Delete ProductId={product._id} />
                </div>
              </>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

export default AllProduct;
