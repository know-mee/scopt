import React from "react";
import Netflix from "../Components/Netflix";
import Amazon from "../Components/Amazon";
import Iptv from "../Components/Iptv";
import Youtube from "../Components/Youtube";
import Canva from "../Components/Canva";
import Spotify from "../Components/Spotify";





const Customers = () => {
  const [activeTab, setActiveTab] = React.useState(1);
  const tabs = [
    { name: "Netflix", id: 1 },
    { name: "Amazon", id: 2 },
    { name: "Iptv", id: 3 },
    { name: "Youtube", id: 4 },
    { name: "Canva", id: 5 },
    { name: "Spotify", id: 6 },
  ];

  return (
    <div className="flex flex-col min-h-screen  md:w-full bg-black md:p-2 text-white">
      <h2 className="text-2xl font-bold mb-4 underline underline-offset-4">
        <i className="mr-2">📷</i>  Customers :-
      </h2>
      <div className="bg-[#1e1e1e]  rounded-lg px-1 md:p-6 flex flex-col ">
        <div className="flex justify-evenly md:justify-center mb-4 gap-2 lg:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-1 md:px-4 py-2 text-sm md:text-xl rounded ${
              activeTab === tab.id ? " border-b  text-white" : " "
            }`}
          >
            {tab.name}
          </button>
        ))}</div>
        <div className="mt-9">
          {activeTab === 1 && <Netflix />}
          {activeTab === 2 && <Amazon/>}
          {activeTab === 3 && <Iptv/>} 
          {activeTab === 4 && <Youtube />}
          {activeTab === 5 && <Canva />}
          {activeTab === 6 && <Spotify />}
        </div>
      </div>



    </div>
  );
};

export default Customers;
