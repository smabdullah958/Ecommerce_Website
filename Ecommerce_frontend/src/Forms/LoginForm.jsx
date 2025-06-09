//for navigation
import { useNavigate } from "react-router-dom";

import axios from "axios"
import { Link } from "react-router";
import { useForm } from "react-hook-form";
function LoginForm({setlogin,setIsLoggedIn}){
//for navigation
let Navigate=useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState:{errors}
    }=useForm();

    async function LoginPostAPI(data){
      try{
        clearErrors();
        let response=await axios.post("http://localhost:5555/api/Login",data,{withCredentials:true});
        if(response.data){
        console.log(response.data);
        alert("login is successfully");
            setIsLoggedIn(true) //user is looged in 
            setlogin(false) //if user is login than automatically login form is close
            if(response.data.Role==="User"){
            Navigate("/")
        }
        if(response.data.Role==="Admin"){
            Navigate("/Home")
        }

    }
    else{
    setIsLoggedIn(false)
    }
    }
catch(error){   
    console.log("errors",error);

    //300 for email is not correct and 401 is for password
    if(error.response && error.response.status===300||error.response.status===401){
        setError("Password",{
            type:"manual",
            message:"email or password is not found"
        })
        alert("incorrect email or password")
    }
}
}

    return(

        <div >
            <form className="h-72 w-56 pt-3 sm:w-60 bg-green-800 rounded-lg border-2 border-black  fixed top-30  right-0 mr-4 mt-4 z-50">

                {errors.Gmail&&<p className="text-red-400">{errors.Gmail.message}</p>}
                <input type="Gmail"  {...register("Gmail",
                {
                    required:{value:true,
                    message:"must be fill"},
                    pattern:{value:/^[a-zA-Z0-9.+%-]+@gmail\.com$/i,
                    message:"@gmail.com must be present"}
                    })}
                     placeholder="username" className="mt-3 sm:ml-3 ml-2 p-1 rounded-md " />

{errors.Password&&<p className="text-red-400">{errors.Password.message}</p>}
                <input type="Password"
                {...register("Password",{
                    required:{value:true,message:"must be fill"}
                })} placeholder="password" className="mt-3 ml-2 sm:ml-3 p-1 rounded-md " />

                <button type="submit"  onClick={handleSubmit((data)=>LoginPostAPI(data))}  className={`border-2 border-black rounded-md p-1  bg-gray-200 hover:bg-gray-400 duration-500 tranition-all ml-3 shadow-black shadow-md `} >Login</button>

                <button className="border-2 border-black rounded-md p-1  bg-gray-200 hover:bg-gray-400 duration-500 tranition-all ml-3 mt-7 shadow-white shadow-md" onClick={()=>setlogin(false)}>cancel</button>

                <h1 className="ml-3 mt-2"> don't have account <br/><Link to="/SignUp" className="hover:text-xl hover:scale-115  duration-500 transition-all pr-4 hover:font-bold text-blue-500   ">SignUp</Link></h1>
            </form>
        </div>
    )
}
export default LoginForm;