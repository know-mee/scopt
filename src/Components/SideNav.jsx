import {
  FaDesktop,
  FaUsers,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";

const SideNav = ({ onClose }) => {
  return (
    <div className="bg-[#1E1E1E] text-white h-screen flex flex-col justify-between text-right p-2 lg:p-6 overflow-hidden">
      <div>
      {/* Close Button for Small Screens */}
      <button
        className="lg:hidden text-white text-right text-xl self-end mb-4"
        onClick={onClose}
      >
        ✖
      </button>

      <div className="flex flex-col gap-2">
        {/* Responsive SCOPT heading */}
        <div className="flex justify-center lg:justify-start py-2">
          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold mb-10 font-serif">
            SCOPT
          </h1>
        </div>
        </div>
        <nav className="flex flex-col gap-2 text-lg">
          <Link
            to="/dashboard"
            onClick={onClose}
            className="flex items-center gap-2 p-3 hover:bg-[#2a2a2a] transition-all duration-300"
          >
            <MdOutlineDashboardCustomize className="text-xl flex-shrink-0" />
            <span className="truncate">Dashboard</span>
          </Link>

          <Link
            to="/platforms"
            onClick={onClose}
            className="flex items-center gap-2 p-3 hover:bg-[#2a2a2a] transition-all duration-300"
          >
            <FaDesktop className="text-xl flex-shrink-0" />
            <span className="truncate">Platform</span>
          </Link>

          <Link
            to="/customers"
            onClick={onClose}
            className="flex items-center gap-2 p-3 hover:bg-[#2a2a2a] transition-all duration-300"
          >
            <FaUsers className="text-xl flex-shrink-0" />
            <span className="truncate">Customers</span>
          </Link>

          <Link
            to="/dailyactions"
            onClick={onClose}
            className="flex items-center gap-2 p-3 hover:bg-[#2a2a2a] transition-all duration-300"
          >
            <FaDesktop className="text-xl flex-shrink-0" />
            <span className="truncate">Daily Actions</span>
          </Link>

          <Link
            to="/finance"
            onClick={onClose}
            className="flex items-center gap-2 p-3 hover:bg-[#2a2a2a] transition-all duration-300"
          >
            <GiTakeMyMoney className="text-xl flex-shrink-0" />
            <span className="truncate">Finance</span>
          </Link>
        </nav>
      </div>

      {/* Space between nav links and logout/settings buttons */}
      <div className="flex flex-col gap-1 text-lg">
        <Link to="/" onClick={onClose}>
          <button className="w-full flex items-center gap-2 p-3 hover:bg-[#2a2a2a] transition-all duration-300">
            <FaSignOutAlt className="flex-shrink-0" />
            Logout
          </button>
        </Link>

        <Link to="/setting" onClick={onClose}>
          <button className="w-full flex items-center gap-2 p-3  hover:bg-[#2a2a2a] transition-all duration-300">
            <FaCog className="flex-shrink-0" />
            Settings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SideNav;
