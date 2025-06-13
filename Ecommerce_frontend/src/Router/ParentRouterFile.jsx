import { Routes,Route } from "react-router";

import PageNotFound from "./404Page.jsx";

//this isa user routers
import UserRoutes_LINK from "./UserRoutes/UserRoutes_LINK.jsx";
import Home from "./UserRoutes/home.jsx";
import ContactUs from "./UserRoutes/ContactUs.jsx";
import SignUp from "../Forms/SignUp.jsx";
import Display_Add_To_Card from "./UserRoutes/Features/Place_Orders/Add_To_Card/Display_Add_To_Card.jsx";
import More from "./UserRoutes/UserMore.jsx";

//this is a Admin Router
import AdminRoutes_Link from "./AdminRoutes/AdminRoute_Link.jsx";
import AdminHome  from "./AdminRoutes/AdminHome.jsx";
import PostItem from "./AdminRoutes/PostItem.jsx"
import AdminMore from "./AdminRoutes/AdminMore.jsx";
import DisplayPlaceOrder from "./UserRoutes/Features/Place_Orders/DisplayPlaceOrder.jsx";

function App(){
    return (
        <div >
        
            <Routes>
              <Route path="*" element={<PageNotFound/>}/>
                {/* for user Routes */}
                <Route element={<UserRoutes_LINK/>}>
                <Route path="/" element={<Home />}  /> 
                <Route path="/Display_Add_To_Card" element={<Display_Add_To_Card />} />
               <Route path="/contactUs" element={<ContactUs />} />
               <Route path="/SignUp" element={<SignUp/>} />
               <Route path="/More/:id" element={<More/>}/>
               </Route>

                {/* for admin routes */}
                <Route element={<AdminRoutes_Link/>}>
                <Route path="/AdminMore/:id" element={<AdminMore/>}/>
               <Route path="/Home" element={<AdminHome/>}/>
               <Route path="/Post" element={<PostItem/>}/>
               <Route path="/Order_Management" element={<DisplayPlaceOrder/>}/>
               <Route path="/" element={<Home />}/>
               </Route>
            </Routes>
            
        </div>
    );
}
export default App;