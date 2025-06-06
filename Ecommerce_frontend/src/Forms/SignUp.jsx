//for redirect
import { useNavigate } from 'react-router-dom';

import axios from 'axios';//for API call
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//for form
import {useForm} from 'react-hook-form';

const SignUpValidaton=yup.object().shape({
FirstName:yup.string().max(50),
LastName:yup.string().required("name is required").min(3,"minimum 3 character allowed").max(50,"minimum 50 character allowed"),
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
    let response=await axios.post("http://localhost:5555/api/",data,{withCredentials:true});
    
console.log("data is postted",response)    
alert("data is posted")
Navigate("/")
}
catch(error){
    console.log("the errors",error);
    if(error.response && error.response.status===403){
        setError("Gmail",{
            type:"manual",
            message:"email is already exist"})
            alert("email is alread exist")
    }
}

    }

    return(
        <div >
        <h1 className='mb-7 sm:m-10 text-5xl font-bold sm:ml-20 ml-10  '>SignUp form</h1>
        <div className='flex justify-center'>
            
        
        <div>
        <form  className='grid grid-cols-1  sm:grid-cols-2  bg-slate-400 h=[100vh] sm:h-96 w-[100vw] sm:w-[80vw] lg:w-[70vw] xl:w-[50vw]  content-center justify-items-center  gap-0 '>

<div>
{errors.FirstName && <p className='text-red-400'>{errors.FirstName.message}</p>}

        <input {...register("FirstName") } placeholder="FirstName" className=" lg:w-72 w-52  h-10 mb-2 sm:w-60 mt-3 sm:mt-0 rounded-md"/>
</div>

<div>
{errors.LastName && <p className='text-red-400'>{errors.LastName.message}</p>}

        <input {...register("LastName")} placeholder='LastName' className='rounded-md lg:w-72 w-52  h-10 mb-2 sm:w-60'/>

     </div>
     <div>   
{errors.Gmail && <p className='text-red-400'>{errors.Gmail.message}</p>}

        <input {...register("Gmail")} placeholder='Email' className='rounded-md  h-10 lg:w-72 w-52 mb-2  sm:w-60' />
      </div>

      <div>  
{errors.Password && <p className='text-red-400'>{errors.Password.message}</p>}

        <input {...register("Password")} placeholder='Password' className='rounded-md h-10 lg:w-72 w-52 mb-2 sm:w-60'/>
       </div>

       <div> 
{errors.PhoneNo && <p className='text-red-400'>{errors.PhoneNo.message}</p>}

        <input {...register("PhoneNo")} placeholder='Contact Number' className='rounded-md h-10 lg:w-72 w-52  sm:w-60 mb-2 sm:col-span-2'/>
</div>


<div>
    {errors.Address&& <p className='text-red-400'>{errors.Address.message}</p>}

    <input {...register("Address")} placeholder="Address"  className='rounded-md h-10 lg:w-72 w-52  sm:w-60 mb-2 sm:col-span-2'/>
</div>


        <button type='submit' onClick={handleSubmit((data)=>POSTAPI(data))}  className='sm:col-span-2 border-2 border-black rounded-lg p-1 bg-slate-300 hover:bg-slate-400 transition-all duration-500 m-5 shadow-black shadow-md'>SignUp</button>

        </form>
        </div>
        </div>
        </div>
    )
}
export default SignUp