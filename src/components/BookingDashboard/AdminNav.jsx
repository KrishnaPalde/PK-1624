
// import React from "react";

// function AdminNav() {
//   const iconButtons = [
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Notification icon" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/907324ac824587bba2bb9cf958abd4883fb2dcd40bdc6bb78c60d09aafd98645?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon" },
//     { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon" }
//   ];

//   return (
//     <header className="flex flex-col rounded-none">
//       <nav className="flex flex-wrap justify-center w-full gap-5 px-5 py-5 bg-white md:justify-between max-md:max-w-full">
//         <h1 className="my-auto text-3xl font-semibold text-slate-700">
//           Dashboard
//         </h1>
//         <div className="flex flex-wrap items-center justify-center gap-2 text-base md:gap-8 text-slate-400">
//           <form className="flex self-stretch gap-4 px-6 py-4 my-auto rounded-full bg-slate-100 max-md:px-5">
//             <label htmlFor="search" className="sr-only">
//               Search for something
//             </label>
//             <img
//               loading="lazy"
//               src="https://cdn.builder.io/api/v1/image/assets/TEMP/e17393eeef2c624c15330dd430e3c1680157ad3b2bd64381610dae9bc90fe4be?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
//               className="object-contain w-5 shrink-0 aspect-square"
//               alt=""
//             />
//             <input
//               type="search"
//               id="search"
//               placeholder="Search for something"
//               className="bg-transparent border-none basis-auto focus:outline-none"
//             />
//           </form>
//           {iconButtons.map((icon, index) => (
//             <button
//               key={index}
//               className="p-0 bg-transparent border-none cursor-pointer"
//             >
//               <img
//                 loading="lazy"
//                 src={icon.src}
//                 className="self-stretch object-contain w-10 my-auto shrink-0 aspect-square"
//                 alt={icon.alt}
//               />
//             </button>
//           ))}
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default AdminNav;

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsSunset } from 'react-icons/bs';

function AdminNav() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-IN', options);
  };

  const getTimeIcon = () => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 17) {
      return <FaSun className="text-yellow-500" />;
    } else if (hour >= 17 && hour < 20) {
      return <BsSunset className="text-orange-500" />;
    } else {
      return <FaMoon className="text-blue-300" />;
    }
  };

  const iconButtons = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Notification icon" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/907324ac824587bba2bb9cf958abd4883fb2dcd40bdc6bb78c60d09aafd98645?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon" }
  ];

  return (
    <header className="flex flex-col rounded-none">
      <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
        <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700">
          Dashboard
        </h1>
        <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
          <div className="flex items-center justify-center w-full md:w-auto">
            <span className="text-lg font-medium">{formatDate(currentTime)}</span>
            <span className="mx-4 text-gray-300">|</span>
            <div className="text-2xl">{getTimeIcon()}</div>
          </div>
          <div className="flex justify-center gap-4 lg:gap-8">
            {iconButtons.map((item, index) => (
              <button
                key={index}
                className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
              >
                <img
                  src={item.icon}
                  className="w-8 h-8"
                  alt={item.alt}
                />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminNav;