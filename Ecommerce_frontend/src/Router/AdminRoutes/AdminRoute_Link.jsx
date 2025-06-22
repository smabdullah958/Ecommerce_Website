import { useState } from "react";
import burgerIcon from "../../burger.webp";


import { Link,Outlet } from "react-router-dom"
function AdminRoutes_Link(){
let [show,hide]=useState(false);

    return(
    <div>
    {/* //for laptop pc etc */}
    <nav className="hidden  sm:h-12 sm:min-w-full sm:bg-stone-200 sm:flex   sm:items-center sm:gap-2 sm:justify-center  sm:text-lg">
        <Link to="/Home" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold ml-4">Home</Link>
        <Link to="/Order_Management" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold   ">Orders</Link>
        <Link to="/Post" className="hover:text-lg sm:hover:text-xl sm:hover:scale-100 duration-500 transition-all pr-3 hover:font-semibold">Post</Link>
        <Link to="/yearly_Sales" className="hover:text-lg sm:hover:text-xl sm:hover:scale-100 duration-500 transition-all pr-3 hover:font-semibold">Sales</Link>

        </nav>
        
        {/* Mobile hamburger button — moved above <Outlet /> */}
        
            <section className="flex justify-end">
                <button onClick={()=>{hide(!show)}} className="sm:hidden  bg-gray-300 p-2 rounded-lg mt-2 border-solid hover:bg-slate-200 transition-all duration-1000 mb-5"><img src={burgerIcon} alt="home" className="size-5" /></button>
                </section>
            {/* mobile menu */}
                <div
                className={`
                  sm:hidden
                 fixed top-0 left-0 w-[90vw] h-full bg-stone-300 flex flex-col items-center justify-center
                  transition-opacity duration-500 ease-in-out z-50
                  ${show ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"}
                `}
              >
        {show?(
            <>
                {/* //mobile */}
            <button onClick={()=>hide(false)} className="top-4 right-4 fixed text-xl">x</button>
                
                <nav className=" sm:hidden z-0 h-[40vw] w-[80vw] bg-stone-300 p-3 grid text-center  grid-cols-1 mb-5 ml-5 fixed left-0  ">
               
                <Link to="/Home" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold"> Home </Link>
                <Link to="/Order_Management" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">Order</Link>
                <Link to="/Post" className="hover:text-xl hover:scale-110  duration-500 transition pr-4 hover:font-semibold">Post</Link>
                <Link to="/yearly_Sales" className="hover:text-xl hover:scale-110  duration-500 transition pr-4 hover:font-semibold">Sales</Link>
            </nav>
            </>
        
        ):null}
        </div>
        <Outlet/>
    </div>
)
}
export default AdminRoutes_Link