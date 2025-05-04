import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { MdSunny } from "react-icons/md";

const Topnav = ({ onMenuClick }) => {
  return (
    <div className="flex justify-between border border-gray-700 bg-[#1E1E1E] text-white p-4">
      <div className="flex items-center gap-2">
      {/* Hamburger Menu Button for Mobile */}
      <button
        className="xl:hidden text-white text-2xl"
        onClick={onMenuClick}
      >
        ☰
      </button>

      <div>
        <h1 className=" text-xs sm:text-sm lg:text-lg">Sales & Customers Operation Performance Tool</h1>
      </div>
      </div>
      <div className="flex gap-2">
        <IoIosNotifications className="text-2xl" />
        <MdSunny className="text-2xl" />
      </div>
    </div>
  );
};

export default Topnav;
