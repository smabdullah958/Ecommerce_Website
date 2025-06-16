import burgerIcon from "../../burger.webp";

import { useState } from "react";
import {Link,Outlet} from "react-router";

function UserRoutes_LINK(){
let [show,hide]=useState(false);
    return(
        <>
        {/* this is for laptop or desktop */}
    <nav className="hidden  sm:h-12 sm:min-w-full bg-neutral-200 sm:flex   sm:items-center sm:gap-2 sm:justify-center  sm:text-lg">
        <Link to="/" onClick={()=>hide(false)} className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold"> home </Link>
        <Link to="/Display_Add_To_Card" onClick={()=>hide(false)} className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">Add to card</Link>
        <Link to="/TrackProduct" onClick={()=>hide(false)} className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">TrackProduct</Link>

    </nav>



{/* Mobile hamburger button — moved above <Outlet /> */}

    <section className="flex justify-end">
        <button onClick={()=>{hide(!show)}} className="sm:hidden  bg-gray-300 p-2 rounded-lg mt-2 border-solid hover:bg-slate-200 transition-all duration-1000 mb-5"><img src={burgerIcon} alt="home" className="size-5" /></button>
        </section>
    {/* mobile menu */}
        <div
        className={`
          sm:hidden
         fixed top-0 left-0 w-[90vw] h-full bg-neutral-200 flex flex-col items-center justify-center
          transition-opacity duration-500 ease-in-out z-50
          ${show ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-10"}
        `}
      >
{show?(
    <>
        
    <button onClick={()=>hide(false)} className="top-4 right-4 fixed text-xl">x</button>
        
        <nav className=" sm:hidden z-0 h-[40vw] w-[80vw] bg-neutral-200 p-3 grid text-center  grid-cols-1 mb-5 ml-5 fixed left-0  ">
       
        <Link to="/" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold"> home </Link>
        <Link to="/Display_Add_To_Card" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">Add to card</Link>
        <Link to="/TrackProduct" className="hover:text-xl hover:scale-110  duration-500 transition pr-4 hover:font-semibold">TrackProduct</Link>

    </nav>
    </>

):null}
</div>
{/* page content */}
<Outlet/>
</>
        

)
}
export default UserRoutes_LINK;