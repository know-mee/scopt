import React from "react";
import { FaCog, FaWhatsapp } from "react-icons/fa";

const SettingsPage = () => {
  return (
    <div className="h-screen  bg-[#1a1a1a] text-white p-3">
      <h2 className="text-xl font-semibold flex items-center gap-2 underline underline-offset-4">
        <FaCog /> Settings :-
      </h2>
      <div className="bg-[#222] p-6 mt-4 rounded-md shadow-md min-h-screen ">
        <h3 className="text-xl font-bold mb-6">User Information:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[80%] mx-auto">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-transparent border rounded outline-none"
             
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 bg-transparent border rounded outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Phone Number</label>
            <input
              type="text"
              className="w-full px-4 py-2 bg-transparent border rounded outline-none"
             
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">License Expiry Date</label>
            <input
              type="date"      
              className="w-full px-4 py-2 bg-transparent border rounded outline-none"
              
            />
          </div>
        </div>

        {/* Contact Us Button */}
        <div className="mt-8 flex justify-center">
          <button className="flex items-center gap-2 border  px-4 py-2 cursor-pointer rounded transition">
            <FaWhatsapp  className="text-green-500"/> Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
