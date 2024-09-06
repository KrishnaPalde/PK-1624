// import React, { useState, useEffect } from "react";
// import { FaSun, FaMoon } from 'react-icons/fa';
// import { BsSunset } from 'react-icons/bs';
// import { useAuth } from '../../AuthContext';

// function AdminNav({title}) {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isProfilePopupVisible, setProfilePopupVisible] = useState(false); // State for popup visibility
//   const { logout } = useAuth();

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

//   const handleLogout = () => {
//     logout();
//     console.log("Logged out");
//   };

//   const toggleProfilePopup = () => {
//     setProfilePopupVisible(!isProfilePopupVisible);
//   };

//   const closeProfilePopup = () => {
//     setProfilePopupVisible(false);
//   };

//   const iconButtons = [
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Notification icon" },
//     // { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/907324ac824587bba2bb9cf958abd4883fb2dcd40bdc6bb78c60d09aafd98645?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon" },
//     { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon", onClick: toggleProfilePopup }
//   ];

//   // Click outside listener to close the popup
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (isProfilePopupVisible && !event.target.closest(".profile-popup") && !event.target.closest(".profile-icon-button")) {
//         closeProfilePopup();
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isProfilePopupVisible]);

//   return (
//     <header className="flex flex-col rounded-none">
//       <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
//         <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
//           {title}
//         </h1>
//         <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
//           <div className="flex items-center justify-center w-full md:w-auto">
//             <span className="text-lg font-medium">{formatDate(currentTime)}</span>
//             <span className="mx-4 text-gray-300">|</span>
//             <div className="text-2xl">{getTimeIcon()}</div>
//           </div>
//           <div className="relative flex justify-center gap-4 lg:gap-8">
//             {iconButtons.map((item, index) => (
//               <button
//                 key={index}
//                 className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 ${item.alt.includes('User profile icon') ? 'profile-icon-button' : ''}`}
//                 onClick={item.onClick}
//               >
//                 <img
//                   src={item.icon}
//                   className="w-8 h-8"
//                   alt={item.alt}
//                 />
//               </button>
//             ))}

//             {isProfilePopupVisible && (
//               <div className="absolute right-0 z-50 mt-10 bg-white border rounded-lg shadow-lg profile-popup">
//                 <ul className="p-2">
//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default AdminNav;

import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCog } from 'react-icons/fa';
import { BsSunset } from 'react-icons/bs';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
const process = import.meta.env;

function AdminNav({ title }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isSettingsPopupVisible, setSettingsPopupVisible] = useState(false);
  const [settings, setSettings] = useState({
    _id: '',
    tax: '',
    serviceCharges: '',
    keyId: '',
    secretKey: ''
  });
  const [isEditing, setIsEditing] = useState(false);  

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

  const toggleSettingsPopup = async () => {
    if (!isSettingsPopupVisible) {
      try {
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/global-settings`);
        if (response.data) {
          setSettings({
            _id: response.data._id,  
            tax: response.data.roomTaxesAndCharges.tax,
            serviceCharges: response.data.roomTaxesAndCharges.serviceCharges,
            keyId: response.data.paymentGateway.keyId,
            secretKey: response.data.paymentGateway.secretKey,
          });
        }
      } catch (error) {
        console.error("Failed to fetch global settings", error);
      }
    }
    setSettingsPopupVisible(!isSettingsPopupVisible);
  };
  

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  const handleSaveSettings = async () => {
    try {
      const response = await axios.put(
        `${process.VITE_HOST_URL}/api/admin/global-settings/${settings._id}`,
        settings
      );
      console.log("Settings saved", response.data);
      setSettingsPopupVisible(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSettingsPopupVisible(false);
  };

  const iconButtons = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "Settings icon", onClick: toggleSettingsPopup },
    // { icon: <FaCog className="w-6 h-6" />, alt: "Settings icon", onClick: toggleSettingsPopup }, 
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ccb966e89531d8852beaa85caa96ee5353971134c3a591a62efc980496d29bd0?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7", alt: "User profile icon", onClick: toggleProfilePopup }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (isProfilePopupVisible || isSettingsPopupVisible) && 
        !event.target.closest(".profile-popup") && 
        !event.target.closest(".profile-icon-button") &&
        !event.target.closest(".settings-popup") &&
        !event.target.closest(".settings-icon-button")
      ) {
        setProfilePopupVisible(false);
        setSettingsPopupVisible(false);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfilePopupVisible, isSettingsPopupVisible]);

  return (
    <header className="flex flex-col rounded-none">
      <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
        <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
          {title}
        </h1>
        <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
          <div className="flex items-center justify-center w-full md:w-auto">
            <span className="text-lg font-medium">{formatDate(currentTime)}</span>
            <span className="mx-4 text-gray-300">|</span>
            <div className="text-2xl">{getTimeIcon()}</div>
          </div>
          <div className="relative flex justify-center gap-4 lg:gap-8">
            {iconButtons.map((item, index) => (
              <button
                key={index}
                className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 ${item.alt.includes('Settings icon') ? 'settings-icon-button' : ''}`}
                onClick={item.onClick}
              >
                {typeof item.icon === 'string' ? (
                  <img src={item.icon} className="w-8 h-8" alt={item.alt} />
                ) : (
                  item.icon
                )}
              </button>
            ))}

            {isProfilePopupVisible && (
              <div className="absolute right-0 z-50 mt-10 bg-white border rounded-lg shadow-lg profile-popup w-80">
                <ul className="p-2 divide-y divide-gray-200">
                <li>
                    <button
                      // onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 text-red-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {isSettingsPopupVisible && (
              // <div className="absolute right-0 z-50 p-6 mt-10 bg-white border rounded-lg shadow-lg settings-popup w-96">
              //   <h2 className="mb-4 text-xl font-semibold">Global Settings</h2>
              //   <div className="mb-4">
              //     <h3 className="mb-2 font-semibold">Room Taxes and Charges</h3>
              //     <label className="block font-medium text-gray-700 text-md">Tax (%)</label>
              //     <input
              //       type="number"
              //       name="tax"
              //       value={settings.tax}
              //       onChange={handleSettingsChange}
              //       disabled={!isEditing}
              //       className="block w-full h-10 p-2 mt-1 border-gray-300 rounded-md shadow-sm text-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //     />
              //     <label className="block mt-4 font-medium text-gray-700 text-md">Service Charges</label>
              //     <input
              //       type="number"
              //       name="serviceCharges"
              //       value={settings.serviceCharges}
              //       onChange={handleSettingsChange}
              //       disabled={!isEditing}
              //       className="block w-full h-10 p-2 mt-1 border-gray-300 rounded-md shadow-sm text-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //     />
              //   </div>
              //   <div className="mb-4">
              //     <h3 className="mb-2 font-semibold">Payment Gateway</h3>
              //     <label className="block font-medium text-gray-700 text-md">Key ID</label>
              //     <input
              //       type="text"
              //       name="keyId"
              //       value={settings.keyId}
              //       onChange={handleSettingsChange}
              //       disabled={!isEditing}
              //       className="block w-full h-10 p-2 mt-1 border-gray-300 rounded-md shadow-sm text-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //     />
              //     <label className="block mt-4 font-medium text-gray-700 text-md">Secret Key</label>
              //     <input
              //       type="text"
              //       name="secretKey"
              //       value={settings.secretKey}
              //       onChange={handleSettingsChange}
              //       disabled={!isEditing}
              //       className="block w-full h-10 p-2 mt-1 border-gray-300 rounded-md shadow-sm text-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //     />
              //   </div>
              //   <div className="flex justify-end gap-4">
              //     {isEditing ? (
              //       <>
              //         <button
              //           onClick={handleCancelClick}
              //           className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              //         >
              //           Cancel
              //         </button>
              //         <button
              //           onClick={handleSaveSettings}
              //           className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              //         >
              //           Save
              //         </button>
              //       </>
              //     ) : (
              //       <button
              //         onClick={handleEditClick}
              //         className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              //       >
              //         Edit
              //       </button>
              //     )}
              //   </div>
              // </div>
              <div className="absolute right-20 z-50 p-1 mt-10 bg-white border rounded-lg shadow-lg settings-popup w-80">
                <ul className="p-2 divide-y divide-gray-200">
                <li>
                    <button
                      // onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Room Taxes & Charges
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Payment Gateway
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={handleLogout}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                    >
                      Create Admin
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
