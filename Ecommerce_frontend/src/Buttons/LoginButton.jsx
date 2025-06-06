import { useState } from "react";
import LoginForm from   "../Forms/LoginForm";


function LoginButton({IsLoggedIn , setIsLoggedIn}){
    let [loginform,setloginform]=useState(false);
    return(
        <div>
            <button onClick={()=>setloginform(!loginform)} disabled={IsLoggedIn }  className={`border-2 border-black rounded-md p-1  bg-gray-200  duration-500 tranition-all shadow-black shadow-md hover:bg-gray-300 ${IsLoggedIn?"bg-gray-50 cursor-not-allowed opacity-10":"bg-gray-200 hover:bg-300 cursor-allowed opacity-100"}`} >login</button>
            {loginform?<LoginForm  setlogin={setloginform} setIsLoggedIn={setIsLoggedIn}/>:null} {/* //for cancel button */}
            
        </div>
    ) 
}
export default LoginButton;