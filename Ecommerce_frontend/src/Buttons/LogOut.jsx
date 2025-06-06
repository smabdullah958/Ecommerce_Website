import axios from "axios";
import { useNavigate } from "react-router-dom";
function LogOut({IsLoggedIn,setIsLoggedIn,Role , SetRole}){
let Navigate=useNavigate();    
    async function LogoutFunction(){
        try{
        let response=await axios.get("http://localhost:5555/api/LogOut",{withCredentials:true})
                   
        console.log("logoout is successfully",response)
            setIsLoggedIn(false)
            alert("logout successfully")
             SetRole(null)
            console.log(setIsLoggedIn)
            if(Role==="Admin"){
                Navigate("/")
            }
    
        }
        catch(error){
            console.log({error:"server side error"})
        
        }
    }
    return(
        <div>
            <button onClick={LogoutFunction} disabled={IsLoggedIn===false} className={`border-2 border-black rounded-md p-1  bg-gray-200  duration-500 transition-all shadow-gray-700 shadow-md ${ IsLoggedIn?"bg-gray-200 hover:bg-gray-300 cursor-pointer opacity-100":"bg-gray-50 cursor-not-allowed opacity-10"}
            `}>LogOut</button>
        </div>
    )
}
export default LogOut;