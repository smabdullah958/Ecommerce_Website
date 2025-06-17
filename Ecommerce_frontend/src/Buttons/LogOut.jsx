import {toast , Toaster} from "sonner"
import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogOut({IsLoggedIn,setIsLoggedIn,Role , SetRole}){
let Navigate=useNavigate();    
    async function LogoutFunction(){
        try{
        let response=await axios.get("https://ecommerce-website-backend-ob582n79j.vercel.app/api/LogOut",{withCredentials:true})
                   
        console.log("logoout is successfully",response)
            setIsLoggedIn(false)
             SetRole(null)
            console.log(setIsLoggedIn)
            
            toast.success("Logout successfully")
            setTimeout(() => {
            if(Role==="Admin"){
                Navigate("/")
            }    
            }, 1000);
            
    
        }
        catch(error){
            console.log({error:"server side error"})
        
        }
    }
    return(
        <div>
        <Toaster richColors position="top-left"/>
            <button onClick={LogoutFunction} disabled={IsLoggedIn===false} className={`border-2 border-black rounded-md p-1  bg-gray-200  duration-500 transition-all shadow-gray-700 shadow-md ${ IsLoggedIn?"bg-gray-200 hover:bg-gray-300 cursor-pointer opacity-100":"bg-gray-50 cursor-not-allowed opacity-10"}
            `}>Logout</button>
        </div>
    )
}
export default LogOut;