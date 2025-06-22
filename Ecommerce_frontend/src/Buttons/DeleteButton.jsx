import { toast} from "sonner"
import axios from "axios";

function Delete({ProductId}){
    let DeleteProduct=async()=>{
        try{
             let response=await axios.delete(`http://localhost:5555/UploadItem/DeleteProduct/${ProductId}`);

            console.log("product deleted successfully :",response)
            toast.success("Product deleted")
        }
        catch(error){
            console.error("Error deleting product:", error);
        }
    }
    return(
        <div>
            <button type="submit " onClick={DeleteProduct} className="border-2 border-black rounded-md p-1  bg-gray-200 hover:bg-gray-400 duration-500 tranition-all ml-3 shadow-black shadow-md">Delete</button>
        </div>
    )
}
export default Delete;