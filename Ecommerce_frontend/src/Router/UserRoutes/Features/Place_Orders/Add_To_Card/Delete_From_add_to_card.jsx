import { Toaster,toast } from "sonner"
import axios from "axios"
import { useNavigate } from "react-router"
//here refetch is used tha when a product is delete than automatically frontend is update
 function Delete_Product_from_card({CardID}){
let navigate=useNavigate();

    async    function DeleteProduct(){
        
        try{
        let response=await axios.delete(`https://ecommerce-website-backend-smoky.vercel.app/api/Delete_Product_From_Card/${CardID}`,{
            withCredentials:true
        })
    console.log("product is deleted",response.data) 
    toast.success("Product Deleted successfully!")    
setTimeout(() => {
    navigate("/")
}, 1000);
        
    
    }
    catch(error){
        console.log("internal error",error)
    }
}
    return(
        <div>
        <Toaster richColors position="top-right"/>
            <button onClick={DeleteProduct} className="border-2 border-black rounded-md p-1  bg-gray-200  duration-500 transition-all shadow-gray-700 shadow-md  IsLoggedInbg-gray-200 hover:bg-gray-300 cursor-pointer opacity-100">Delete </button>
        </div>
    )
}
export default Delete_Product_from_card