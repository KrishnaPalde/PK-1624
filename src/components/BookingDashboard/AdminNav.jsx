// import React, { useState, useEffect } from "react";
// import { FaSun, FaMoon } from 'react-icons/fa';
// import { BsSunset } from 'react-icons/bs';

// function AdminNav() {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatDate = (date) => {
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString('en-IN', options);
//   };

//   const getTimeIcon = () => {
//     const hour = currentTime.getHours();
//     if (hour >= 6 && hour < 17) {
//       return <FaSun className="text-yellow-500" />;
//     } else if (hour >= 17 && hour < 20) {
//       return <BsSunset className="text-orange-500" />;
//     } else {
//       return <FaMoon className="text-blue-300" />;
//     }
//   };

//   const iconButtons = [
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Notification icon" },
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/907324ac824587bba2bb9cf958abd4883fb2dcd40bdc6bb78c60d09aafd98645?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon" },
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon" }
//   ];

//   return (
//     <header className="flex flex-col rounded-none">
//       <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
//         <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
//           Dashboard
//         </h1>
//         <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
//           <div className="flex items-center justify-center w-full md:w-auto">
//             <span className="text-lg font-medium">{formatDate(currentTime)}</span>
//             <span className="mx-4 text-gray-300">|</span>
//             <div className="text-2xl">{getTimeIcon()}</div>
//           </div>
//           <div className="flex justify-center gap-4 lg:gap-8">
//             {iconButtons.map((item, index) => (
//               <button
//                 key={index}
//                 className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
//               >
//                 <img
//                   src={item.icon}
//                   className="w-8 h-8"
//                   alt={item.alt}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default AdminNav;

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from 'react-icons/fa';
import { BsSunset } from 'react-icons/bs';
import { useAuth } from '../../AuthContext';

function AdminNav() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false); // State for popup visibility
  const { logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    console.log("Logged out");
  };

  const toggleProfilePopup = () => {
    setProfilePopupVisible(!isProfilePopupVisible);
  };

  const closeProfilePopup = () => {
    setProfilePopupVisible(false);
  };

  const iconButtons = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Notification icon" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/907324ac824587bba2bb9cf958abd4883fb2dcd40bdc6bb78c60d09aafd98645?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon", onClick: toggleProfilePopup }
  ];

  // Click outside listener to close the popup
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfilePopupVisible && !event.target.closest(".profile-popup") && !event.target.closest(".profile-icon-button")) {
        closeProfilePopup();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfilePopupVisible]);

  return (
    <header className="flex flex-col rounded-none">
      <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
        <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
          Dashboard
        </h1>
        <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
          <div className="flex items-center justify-center w-full md:w-auto">
            <span className="text-lg font-medium">{formatDate(currentTime)}</span>
            <span className="mx-4 text-gray-300">|</span>
            <div className="text-2xl">{getTimeIcon()}</div>
          </div>
          <div className="flex justify-center gap-4 lg:gap-8 relative">
            {iconButtons.map((item, index) => (
              <button
                key={index}
                className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 ${item.alt.includes('User profile icon') ? 'profile-icon-button' : ''}`}
                onClick={item.onClick}
              >
                <img
                  src={item.icon}
                  className="w-8 h-8"
                  alt={item.alt}
                />
              </button>
            ))}

            {isProfilePopupVisible && (
              <div className="profile-popup absolute right-0 mt-10 bg-white border rounded-lg shadow-lg z-50">
                {/* Added mt-10 to ensure the popup is below the profile icon */}
                <ul className="p-2">
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminNav;




// import React, { useState, useEffect } from "react";
// import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
// import { BsSunset } from 'react-icons/bs';

// function AdminNav({ onMenuClick }) {
//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatDate = (date) => {
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
//     return date.toLocaleDateString('en-IN', options);
//   };

//   const getTimeIcon = () => {
//     const hour = currentTime.getHours();
//     if (hour >= 6 && hour < 17) {
//       return <FaSun className="text-yellow-500" />;
//     } else if (hour >= 17 && hour < 20) {
//       return <BsSunset className="text-orange-500" />;
//     } else {
//       return <FaMoon className="text-blue-300" />;
//     }
//   };

//   const iconButtons = [
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Notification icon" },
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/907324ac824587bba2bb9cf958abd4883fb2dcd40bdc6bb78c60d09aafd98645?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon" },
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon" }
//   ];

//   return (
//     <header className="flex flex-col rounded-none">
//       <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
//         <div className="flex items-center">
//           <button
//             onClick={onMenuClick}
//             className="p-2 mr-4 text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100 md:hidden"
//           >
//             <FaBars className="w-6 h-6" />
//           </button>
//           <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700">
//             Dashboard
//           </h1>
//         </div>
//         <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
//           <div className="flex items-center justify-center w-full md:w-auto">
//             <span className="text-lg font-medium">{formatDate(currentTime)}</span>
//             <span className="mx-4 text-gray-300">|</span>
//             <div className="text-2xl">{getTimeIcon()}</div>
//           </div>
//           <div className="flex justify-center gap-4 lg:gap-8">
//             {iconButtons.map((item, index) => (
//               <button
//                 key={index}
//                 className="p-2 transition-colors duration-200 rounded-full hover:bg-gray-100"
//               >
//                 <img
//                   src={item.icon}
//                   className="w-8 h-8"
//                   alt={item.alt}
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default AdminNav;