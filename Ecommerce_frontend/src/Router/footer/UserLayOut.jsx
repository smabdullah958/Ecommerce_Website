
// import { Outlet } from "react-router";
import FooterLink from "./Link";
import UserRoutes_LINK from "../UserRoutes/UserRoutes_LINK";

function UserLayOut() {
  return (
    <div className="min-h-screen flex flex-col">
    {/* //header */}
      <UserRoutes_LINK />
      <main className="flex-grow">
        {/* <Outlet /> */}
      </main>
      {/* footer */}    
      <FooterLink />
    </div>
  );
}

export default UserLayOut;
