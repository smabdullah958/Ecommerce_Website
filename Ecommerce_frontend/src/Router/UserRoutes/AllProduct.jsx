import UpdateForm from "../../Forms/UpdatePostForm";

import {Link,useNavigate } from "react-router-dom";
import axios from "axios";
import Searching from "./Searching";
import { useEffect, useState } from "react";
 import LoginButton from "../../Buttons/LoginButton";
 import LogOut from "../../Buttons/LogOut";
import Delete from "../../Buttons/DeleteButton";
import Update from "../../Buttons/UpdatePostButton"

function AllProduct(){
//for product id to find and updated
let [SelectedProductId,SetSelectedProductId]=useState(null)

//for sending the whole product for prefilling the update
let [SelectedProduct,SetSelectedProduct]=useState(null);

    let [ShowForm,SetShowForm]=useState(false)
       let [Loading,SetLoading]=useState(true);
    let [Product,SetProduct]=useState([])
let Navigate=useNavigate()
     let [IsLoggedIn,setIsLoggedIn]=useState(null);
    let [Role,SetRole]=useState(null);
 //her we display the whole product
 useEffect(()=>{
    let checkLogin=async()=>{
            try{

            let response =await axios.get("http://localhost:5555/api/checkLogin", { withCredentials: true });
            if(response.data.isLoggedIn===true){
                setIsLoggedIn(true);
                SetRole(response.data.Role)  //store role
  console.log(response.data.Role);

            }
            else{
                setIsLoggedIn(false)
                SetRole(null);
                console.log(response.data.Role)
            }
        }
        catch(error){
            console.log("error",error)
        }}

    let DisplayProduct=async()=>{
        try{
        let response=await axios.get("http://localhost:5555/UploadItem/DisplayProduct");
        console.log(response.data);
        if(response.data){
            //.Product is come forma a backend because in this object the real product is present
            SetProduct(response.data.Product)
        }
    }
    catch(error){
        console.log("error",error)
    }
    finally{
        SetLoading(false)
    }
}

checkLogin()
        DisplayProduct();
        },[]);

        //it is used for a redirectional
        useEffect(()=>{
            if(IsLoggedIn===true && Role==="Admin"){
                Navigate("/Home");
            }
            if(IsLoggedIn===true && Role==="User"){
                Navigate("/");
            }
        },[IsLoggedIn,Role])



        if(Loading){
            return(
                <div className="flex justify-center justify-items-center h-[40vh]">
            <div className="animate-spin rounded-full h-36 w-36 border-b-4 border-blue-600"></div>
            </div>
        );}

    return(

        

<div>



{/* //this is for show the update form */}
{ShowForm && <UpdateForm Close={() =>
 SetShowForm(false)}
 ProductId={SelectedProductId} //her we pass the id of the product to update
 Product={SelectedProduct} //here we pass the full product for prefiilling the updated form
 />}
{/* here role is passed for searchin with the help ofa  ProductId */}
 <Searching    SetProduct={SetProduct} Role={Role}  />
 <div className="min-h-screen bg-gray-100 px-6 py-6   overflow-x-hidden">


 <section className="flex justify-end gap-4 ">


            {Role!=="Admin" &&
            <LoginButton IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            }

            <LogOut  IsLoggedIn={IsLoggedIn} setIsLoggedIn={setIsLoggedIn} Role={Role} SetRole={SetRole}/>





         </section>

<div>
    {/* if searching is fail */}
{
 Product.length === 0 && (
    <div className="text-center text-gray-600 text-xl my-10">
      Product not found
    </div>
  )
}

</div>

             <section className="grid sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4  gap-y-6  mt-6 overflow-hidden    max-w-[100%] max-h-[auto]">
                {
                    Product.map((product,index)=>(
                         <section className={`hover:scale-105 transition-transform duration-500 w-full  mx-auto my-3 pb-2 ${Role==="Admin"?"rounded-xl shadow-xl bg-white h-full":""} `} key={index} 
                         style={{maxWidth:"220px"}}> 

                        {product.images&&(
                            <img src={`http://localhost:5555/UploadItem/UploadPost/${product.images}`} alt={product.name}  className="h-48 w-[100vw]  "  />)}

                            <div className="bg-white">
                            <h2 className="text-xl font-bold text-gray-800 pl-5 truncate ">
                                        {product.title}
                        </h2>

                            <h2 className="pl-5  text-lg  font-semibold ">
                                     RS {product.price }
                            </h2>

                        {(Role==="User"||Role===null) &&
                         <Link to={`/More/${product._id}`} className="pl-5 text-blue-400">More</Link>
                        }
                        {Role==="Admin"&&
                        <Link to={`/AdminMore/${product._id}`} className="text-blue-400 pl-5">More</Link>}

                        {
                            Role==="Admin"&& (
                                <div className="grid grid-cols-2 justify-items-center">

                            <Update onClick={()=>{
                                SetShowForm(true);
                                SetSelectedProductId(product._id);    //for product id to find and updated
                                SetSelectedProduct(product)            //for sending the whole product for prefilling the update
                            }



                            }/>
                            <Delete ProductId={product._id}/> {/*  for delete product by id  */}
                            </div>
                            )
                        }
</div>

                        </section>
                    ))
                }

            </section>

        </div>

      </div>

    )

            }
export default AllProduct