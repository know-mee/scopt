import React from 'react';
import { GiTakeMyMoney } from "react-icons/gi";

const Finance = () => {
  return (
    <div className="bg-black text-white h-screen flex flex-col  p-4">
      <div className="flex items-center gap-2 text-xl font-semibold mb-4 px-1">
        <GiTakeMyMoney className="text-xl" /> 
        <h1 className="border-b">Finance :-</h1>
      </div>
      <div className="flex-grow bg-[#1E1E1E] flex justify-center items-center w-full">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
          Coming Soon
        </h1>
      </div>
    </div>
  );
};

export default Finance;
