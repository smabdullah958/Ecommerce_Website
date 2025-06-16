import { Routes,Route } from "react-router";
import PageNotFound from "./404Page.jsx";

//this isa user routers
//inside userlayout the footer and header links aree presend
import UserLayOut from "./footer/UserLayOut.jsx";
import Home from "./UserRoutes/home.jsx";
// import ContactUs from "./UserRoutes/ContactUs.jsx";
import SignUp from "../Forms/SignUp.jsx";
import Display_Add_To_Card from "./UserRoutes/Features/Place_Orders/Add_To_Card/Display_Add_To_Card.jsx";
import More from "./UserRoutes/UserMore.jsx";
import TrackProduct from "./UserRoutes/TrackProduct.jsx";
// footer
import PrivacyPolicy from "./footer/privacyPolicy.jsx";
import RefundPolicy from "./footer/RefundPolicy.jsx";
import ShippingPolicy from "./footer/ShippingPolicy.jsx";
import TermsAndCondition from "./footer/TermsCondition.jsx";
import ContactUs from "./footer/ContactUs.jsx";

//this is a Admin Router
import AdminRoutes_Link from "./AdminRoutes/AdminRoute_Link.jsx";
import AdminHome  from "./AdminRoutes/AdminHome.jsx";
import PostItem from "./AdminRoutes/PostItem.jsx";
import AdminMore from "./AdminRoutes/AdminMore.jsx";
import DisplayPlaceOrder from "./UserRoutes/Features/Place_Orders/DisplayPlaceOrder.jsx";



function App(){
    return (
        <div >
<main>        
            <Routes>
                {/* for user Routes */}
                
{/* //inside userlayout the footer and header links aree presend */}
                <Route element={<UserLayOut/>}>
               
                
                <Route path="/" element={<Home />}  /> 
                <Route path="/Display_Add_To_Card" element={<Display_Add_To_Card />} />
               <Route path="/SignUp" element={<SignUp/>} />
               <Route path="/More/:id" element={<More/>}/>
                <Route path="/TrackProduct" element={<TrackProduct/>}/>    

               {/* footer */}
               <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>}/>
               <Route path="/RefundPolicy" element={<RefundPolicy/>}/>
               <Route path="/ShippingPolicy" element={<ShippingPolicy/>}/>
               <Route path="/TermsCondition" element={<TermsAndCondition/>}/>
                <Route path="/ContactUs" element={<ContactUs/>}/>


                </Route>

                {/* for admin routes */}
                <Route element={<AdminRoutes_Link/>}>
                <Route path="/AdminMore/:id" element={<AdminMore/>}/>
               <Route path="/Home" element={<AdminHome/>}/>
               <Route path="/Post" element={<PostItem/>}/>
               <Route path="/Order_Management" element={<DisplayPlaceOrder/>}/>
               <Route path="/" element={<Home />}/>

               </Route>
              <Route path="*" element={<PageNotFound/>}/>


            </Routes>
                </main>
                {/* <FooterLink/>       */}
        </div>
    );
}
export default App;