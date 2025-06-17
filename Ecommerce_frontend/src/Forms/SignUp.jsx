import {toast , Toaster} from "sonner"
//for redirect
import { useNavigate } from 'react-router-dom';

import axios from 'axios';//for API call
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//for form
import {useForm} from 'react-hook-form';

const SignUpValidaton=yup.object().shape({
Name:yup.string().required("name is required").max(50,"maximum 50 character allowed"),
City:yup.string().required("city is required").min(3,"minimum 3 character allowed").max(50,"maximum 50 character allowed"),
Gmail:yup.string().required("Email is required").email("invalid Email").matches(/^[a-zA-Z0-9.+_]+@gmail\.com$/,"@gmail.com must be present"),
Password:yup.string().required("password is required").min(5,"minimum 5 characer is allowed"),
PhoneNo:yup.string().required().matches(/^[0-9]{10}$/,"10 digit is allowed"),
Address:yup.string().required("Address is required")
})

function SignUp(){
    //for navigation
let Navigate=useNavigate()

    
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState:{errors}
    }=useForm({
        resolver:yupResolver(SignUpValidaton),
    });

   async function POSTAPI(data){
    try{
        clearErrors() //it will clrear previous error
    let response=await axios.post("https://ecommerce-website-backend-ob582n79j.vercel.app/api/",data,{withCredentials:true});
    
console.log("data is postted",response)    
toast.success("signup successfully")
setTimeout(() => {
Navigate("/")    
}, 2000);

}
catch(error){
    console.log("the errors",error);
    if(error.response && error.response.status===403){
        setError("Gmail",{
            type:"manual",
            message:"email is already exist"})
            toast.error("Gmail is already exist")
    }
}

    }

    return(
        <div className="min-h-screen bg-gradient-to-br  from-slate-100 to-slate-300 flex items-center justify-center p-4">

        <Toaster richColors position="top-left"/>
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <h1 className='sm:my-7  text-5xl font-bold sm:ml-20   '>SignUp form</h1>
        <div className='flex justify-center'>
            
        
        <div>
        <form  className='grid grid-cols-1  sm:grid-cols-2 mb-5  h-[100vh] sm:h-60 w-[100vw] sm:w-[80vw] lg:w-[70vw] xl:w-[50vw]  content-center justify-items-center  gap-0  '>

<div>
{errors.Name && <p className='text-red-400'>{errors.Name.message}</p>}

        <input {...register("Name") } placeholder="User Name" className="bg-gray-200 lg:w-72 w-52  h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md"/>
</div>

     <div>   
{errors.Gmail && <p className='text-red-400'>{errors.Gmail.message}</p>}

        <input {...register("Gmail")} placeholder='Email' className='bg-gray-200 rounded-md  h-10 lg:w-72 w-52 mb-2  sm:w-60' />
      </div>

      <div>  
{errors.Password && <p className='text-red-400'>{errors.Password.message}</p>}

        <input {...register("Password")} placeholder='Password' className='bg-gray-200 rounded-md h-10 lg:w-72 w-52 mb-2 sm:w-60'/>
       </div>

       <div> 
{errors.PhoneNo && <p className='text-red-400'>{errors.PhoneNo.message}</p>}

        <input {...register("PhoneNo")} placeholder='Contact Number' className='rounded-md h-10 lg:w-72 w-52  sm:w-60 mb-2 sm:col-span-2 bg-gray-200'/>
</div>


<div>
{errors.City && <p className='text-red-400'>{errors.City.message}</p>}

        <input {...register("City")} placeholder='User City' className='bg-gray-200 rounded-md lg:w-72 w-52  h-10 mb-2 sm:w-60'/>

     </div>

<div>
    {errors.Address&& <p className='text-red-400'>{errors.Address.message}</p>}

    <input {...register("Address")} placeholder="Address"  className='bg-gray-200 rounded-md h-10 lg:w-72 w-52  sm:w-60 mb-2 sm:col-span-2'/>
</div>


        <button type='submit' onClick={handleSubmit((data)=>POSTAPI(data))}  className='sm:col-span-2 border-2 border-black rounded-lg p-1 bg-slate-300 hover:bg-slate-400 transition-all duration-500 m-5 shadow-black shadow-md'>SignUp</button>

        </form>
        </div>
        </div>
        </div>
        </div>
    )
}
export default SignUp