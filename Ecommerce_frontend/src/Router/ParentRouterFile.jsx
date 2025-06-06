import { Routes,Route } from "react-router";

import PageNotFound from "./404Page.jsx";

//this isa user routers
import UserRoutes_LINK from "./UserRoutes/UserRoutes_LINK.jsx";
import Home from "./UserRoutes/home.jsx";
import ContactUs from "./UserRoutes/ContactUs.jsx";
import SignUp from "../Forms/SignUp.jsx";
import Display from "./UserRoutes/display.jsx";

//this is a Admin Router
import AdminRoutes_Link from "./AdminRoutes/AdminRoute_Link.jsx";
import AdminHome  from "./AdminRoutes/AdminHome.jsx";
import Order_Mangement from "./AdminRoutes/Order_Management.jsx";
import PostItem from "./AdminRoutes/PostItem.jsx"
import More from "./UserRoutes/More.jsx";
function App(){
    return (
        <div >
        
            <Routes>
              <Route path="*" element={<PageNotFound/>}/>
                {/* for user Routes */}
                <Route element={<UserRoutes_LINK/>}>
                <Route path="/" element={<Home />}  /> 
                <Route path="/display" element={<Display />} />
               <Route path="/contactUs" element={<ContactUs />} />
               <Route path="/SignUp" element={<SignUp/>} />
               <Route path="/More/:id" element={<More/>}/>
               </Route>
                {/* for admin routes */}
                <Route element={<AdminRoutes_Link/>}>
               <Route path="/Home" element={<AdminHome/>}/>
               <Route path="/Post" element={<PostItem/>}/>
               <Route path="/Order_Management" element={<Order_Mangement/>}/>
               <Route path="/" element={<Home />}/>
               </Route>
            </Routes>
            
        </div>
    );
}
export default App;