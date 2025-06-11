import axios from "axios";
import { useEffect, useState } from "react";

//searchreslt is used to change the UI if we search something without this the UI is not change
let Order_Searching=({SearchResult})=>{
//for searching
    let [searchText, setSearchText] = useState("");

useEffect(() => {
    if (!searchText) return; // Don't call if input is empty
async function SearchOrders(){
    try{
        let response = await axios.get("http://localhost:5555/api/Search_Order", {
            params: {
                searchText: searchText
            }
        }); 
        //.result is come from a backendd
        SearchResult(response.data.result)
        
        console.log(response.data);
    }
    catch(error) {
        console.error("Error fetching orders:", error);
    }
}
SearchOrders()
},[searchText, SearchResult]); 
return(
        <>
            <input type="text" onChange={(e)=>setSearchText(e.target.value)} className="text-xs sm:text-sm lg:text-md p-[5px] w-[60vw] sm:mr-5 sm:w-96 rounded-xl border-2 border-black border-solid hover:bg-gray-200 transition duration-1000 mb-5" placeholder="Searching by Order ID " />
        </>
    )
}
export default Order_Searching;