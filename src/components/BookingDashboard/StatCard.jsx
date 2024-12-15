import React from "react";

const StatCard = ({ title, value, bgColor, icon: Icon, iconColor }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105 hover:shadow-lg">
        <div
          className={`flex-shrink-0 ${bgColor} rounded-full h-12 w-12 md:h-16 md:w-16 flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 md:w-8 md:h-8 ${iconColor}`} />
        </div>
        <div className="flex flex-col">
          <div className="text-sm md:text-base text-slate-500 font-medium">
            {title}
          </div>
          <div className="mt-1 text-xl md:text-2xl font-bold text-[#335064]">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
