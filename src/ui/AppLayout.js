import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="bg-violet-200 bg-gradient-to-r from-violet-300 to-violet-100 overflow-y-hidden">
      <Navbar />
      <div className="sm:h-[77vh] overflow-scroll overflow-x-hidden h-[77vh] md:h-[77vh] ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
