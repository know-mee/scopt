import { useState } from "react";
import { Outlet } from "react-router-dom";
import Topnav from "../Components/Topnav";
import SideNav from "../Components/SideNav";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar (visible on larger screens) */}
      <div className="hidden xl:block w-[14%] bg-red-400 h-screen">
        <SideNav />
      </div>

      {/* Small screen sidebar (slide out) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-black bg-opacity-60"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[250px] h-full bg-[#1E1E1E] overflow-hidden"
          >
            <SideNav onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 bg-black h-screen w-full  flex flex-col">
        {/* Topnav */}
        <div className="h-[10vh]">
          <Topnav onMenuClick={toggleSidebar} />
        </div>

        {/* Outlet container */}
        <div className="h-[90vh] bg-[#121212] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
