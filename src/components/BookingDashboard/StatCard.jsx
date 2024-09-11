import React from "react";

const StatCard = ({ title, value, bgColor, icon: Icon, iconColor }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-xl">
        <div className={`flex-shrink-0 ${bgColor} rounded-full md:h-16 md:w-16 h-10 w-10 flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor} md:h-6 md:w-6`} />
        </div>
        <div className="flex flex-col">
          <div className="text-sm lg:text-base text-slate-400">{title}</div>
          <div className="mt-1 text-xl font-semibold lg:text-2xl text-[#335064]">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
