// import React from "react";

// const StatCard = ({ title, value, bgColor }) => {
//   return (
//     <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
//       <div className="flex w-full gap-4 py-6 bg-white shadow-lg grow px-9 rounded-3xl max-md:px-5 max-md:mt-8">
//         <div
//           className={`flex shrink-0 ${bgColor} rounded-full h-[70px] w-[70px]`}
//         />
//         <div className="flex flex-col my-auto">
//           <div className="text-base text-slate-400">{title}</div>
//           <div className="self-start mt-2 text-2xl font-semibold text-neutral-800">
//             {value}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatCard;

import React from "react";

const StatCard = ({ title, value, bgColor }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 p-4 bg-white shadow-lg rounded-xl">
        <div
          className={`flex-shrink-0 ${bgColor} rounded-full h-16 w-16`}
        />
        <div className="flex flex-col">
          <div className="text-sm lg:text-base text-slate-400">{title}</div>
          <div className="mt-1 text-xl lg:text-2xl font-semibold text-neutral-800">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
