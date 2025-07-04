import axios from "axios";
import { useState,useEffect } from "react";
function Searching({SetProduct,Role}){
        let [Searching,SetSearching]=useState({
            price:"",
            SearchText:"", //it is used for both title and  ProductId
                        
        })

        useEffect(()=>{
        

        async function Search(){
       
            try{

            
                let response=await axios.get("http://localhost:5555/api/SEARCHING",{
                    params:{
                    SearchText:Searching.SearchText, //this is used for both title and ProductId
                    price:Searching.price,
                    Role:Role //this is used for a search with the help of a ProductId but if a role is admin
                    }
                });
                console.log(response.data);
                SetProduct(response.data.SearchResult)
            }
            catch(error){
                console.log("so error = ",error)
            }
        }
        Search();
    },[Searching,SetProduct]);
    return(
        <form  className=" flex">
        {/* it is used for searching the product by title and ProductId */}
                <input type="text"  className="ml-1 p-1  w-[60vw] sm:mr-5 sm:w-96 rounded-lg border-2 border-black border-solid hover:bg-gray-200 transition duration-1000" placeholder="Searching" 
                onChange={(e)=>
                SetSearching((prev)=>
                 ({...prev,SearchText:e.target.value}))}/>

                <select name="range" className="p-1  w-[40vw] hover:bg-gray-200 transition duration-1000 rounded-lg border-2 border-black border-solid sm:w-40   " value={Searching.price} onChange={(e)=>
                SetSearching((prev)=>
                ({...prev,price:e.target.value}))}>
                    <option value="">select range</option>
                    <option value="2000">below 2000</option>
                    <option  value="5000">below 5000</option>
                    <option value="8000">below 8000</option>
                    <option value="20000">below 20000</option>
                </select>
                
                </form>
    )
}
export default Searching;