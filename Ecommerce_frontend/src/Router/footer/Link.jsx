
import { Link } from "react-router-dom";

function FooterLink() {
  return (
    <nav className="bottom-0 sm:h-16 sm:w-[100vw] bg-slate-500 grid grid-cols-1 p-2 h-36 justify-items-center sm:flex sm:items-center sm:gap-2 sm:justify-center sm:mb-4 sm:text-lg ">
      <Link to="/PrivacyPolicy" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">Privacy</Link>
      <Link to="/RefundPolicy" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">Refund</Link>
      <Link to="/ShippingPolicy" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">Shipping</Link>
      <Link to="/TermsCondition" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">TermsAndCondition</Link>
      <Link to="/ContactUs" className="hover:text-xl hover:scale-110 duration-500 transition-all pr-3 hover:font-semibold">ContactUs</Link>
    </nav>
  );
}

export default FooterLink;
