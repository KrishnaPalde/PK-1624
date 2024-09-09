import React, { useState, useEffect } from "react";
import { FaSun, FaMoon, FaCog, FaTimes } from "react-icons/fa";
import { BsSunset } from "react-icons/bs";
import { useAuth } from "../../AuthContext";
import profile from "../../assets/profile.png";
import axios from "axios";

const process = import.meta.env;

function AdminNav({ title }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isProfilePopupVisible, setProfilePopupVisible] = useState(false);
  const [isSettingsPopupVisible, setSettingsPopupVisible] = useState(false);
  const [isTaxesPopupVisible, setTaxesPopupVisible] = useState(false);
  const [isPaymentPopupVisible, setPaymentPopupVisible] = useState(false);
  const [isChangePasswordPopupVisible, setChangePasswordPopupVisible] = useState(false);
  const [isCreateAdminPopupVisible, setCreateAdminPopupVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [settings, setSettings] = useState({
    _id: "",
    tax: "",
    serviceCharges: "",
    keyId: "",
    secretKey: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const { user,logout } = useAuth();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-IN", options);
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
        const response = await axios.get(
          `${process.VITE_HOST_URL}/api/admin/global-settings`
        );
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
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.VITE_HOST_URL}/api/admin/global-settings/${settings._id}`,
        settings
      );
      console.log("Settings saved", response.data);
      setSettingsPopupVisible(false);
      setTaxesPopupVisible(false);
      setPaymentPopupVisible(false);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save settings", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    if (newPassword !== currentPassword) {
      console.error("Passwords do not match");
      return;
    }
  
    try {
      if (!user || !user.id) {
        console.error("User information not available");
        return;
      }
  
      const response = await axios.put(
        `${process.VITE_HOST_URL}/api/admin/${user.id}/reset-password`,
        {
          currentPassword,
          newPassword,
        }
      );
  
      console.log("Server response:", response);
  
      if (response.data) {
        setChangePasswordPopupVisible(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        alert(response.data.message);
      } else {
        console.error("Server response data is undefined");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${process.VITE_HOST_URL}/api/admin/create-admin`,
        { email, password }
      );
      console.log("Admin created:", response.data);
      setCreateAdminPopupVisible(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error("Error creating admin:", error);
    }
  };
  
  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setSettingsPopupVisible(false);
    setTaxesPopupVisible(false);
    setPaymentPopupVisible(false);
  };

  const iconButtons = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41398295ae0a8114089b72721383e2723c69aaf3fb09c01943de56ea863869c3?placeholderIfAbsent=true&apiKey=e6b8c17325a24fb29c274ce450ea26a7",
      alt: "Settings icon",
      onClick: toggleSettingsPopup,
    },
    { icon: profile, alt: "User profile icon", onClick: toggleProfilePopup },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        (isProfilePopupVisible ||
          isSettingsPopupVisible ||
          isTaxesPopupVisible ||
          isPaymentPopupVisible) &&
        !event.target.closest(".profile-popup") &&
        !event.target.closest(".profile-icon-button") &&
        !event.target.closest(".settings-popup") &&
        !event.target.closest(".settings-icon-button") &&
        !event.target.closest(".taxes-popup") &&
        !event.target.closest(".payment-popup")
      ) {
        setProfilePopupVisible(false);
        setSettingsPopupVisible(false);
        setTaxesPopupVisible(false);
        setPaymentPopupVisible(false);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [
    isProfilePopupVisible,
    isSettingsPopupVisible,
    isTaxesPopupVisible,
    isPaymentPopupVisible,
  ]);

  const toggleChangePasswordPopup = () => {
    setChangePasswordPopupVisible(!isChangePasswordPopupVisible);
    setProfilePopupVisible(false);
  };

  return (
    <header className="flex flex-col rounded-none">
      <nav className="flex flex-col w-full gap-5 px-5 py-5 bg-white md:flex-row md:justify-between max-md:max-w-full">
        <h1 className="my-auto text-3xl font-semibold text-center md:text-left text-slate-700 md:pl-12">
          {title}
        </h1>
        <div className="flex flex-col items-center gap-4 text-base md:flex-row md:justify-end md:gap-8 text-slate-600">
          <div className="flex items-center justify-center w-full md:w-auto">
            <span className="text-lg font-medium">
              {formatDate(currentTime)}
            </span>
            <span className="mx-4 text-gray-300">|</span>
            <div className="text-2xl">{getTimeIcon()}</div>
          </div>
          <div className="relative flex justify-center gap-4 lg:gap-8">
            {iconButtons.map((item, index) => (
              <button
                key={index}
                className={`p-2 transition-colors duration-200 rounded-full hover:bg-gray-100 ${
                  item.alt.includes("Settings icon")
                    ? "settings-icon-button"
                    : ""
                }`}
                onClick={item.onClick}
              >
                {typeof item.icon === "string" ? (
                  <img
                    src={item.icon}
                    className="object-cover w-8 h-8"
                    alt={item.alt}
                  />
                ) : (
                  item.icon
                )}
              </button>
            ))}

            {isProfilePopupVisible && (
              <div className="absolute right-0 z-50 w-64 mt-10 bg-white border rounded-lg shadow-lg profile-popup">
                <ul className="p-2 divide-y divide-gray-200">
                  <li>
                    <button onClick={toggleChangePasswordPopup} 
                    className="block w-full px-4 py-2 text-left text-gray-700 text-md hover:bg-gray-100">
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-red-700 text-md hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {isSettingsPopupVisible && (
              <div className="absolute right-0 z-50 w-48 max-w-sm mt-10 bg-white border rounded-lg shadow-lg md:right-20 settings-popup md:w-80 md:max-w-none">
                <ul className="p-2 divide-y divide-gray-200">
                  <li>
                    <button
                      onClick={() => {
                        setTaxesPopupVisible(true);
                        setSettingsPopupVisible(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-gray-700 rounded-lg text-md hover:bg-gray-100"
                    >
                      Room Taxes & Charges
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setPaymentPopupVisible(true);
                        setSettingsPopupVisible(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-gray-700 rounded-lg text-md hover:bg-gray-100"
                    >
                      Payment Gateway
                    </button>
                  </li>
                  <li>
                    <button 
                    onClick={() => {
                      setCreateAdminPopupVisible(true);
                      setSettingsPopupVisible(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-700 rounded-lg text-md hover:bg-gray-100">
                      Create Admin
                    </button>
                  </li>
                </ul>
              </div>
            )}

            {isTaxesPopupVisible && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl taxes-popup">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Room Taxes & Charges
                    </h2>
                    <button
                      onClick={handleCancelClick}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="tax"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Tax (%)
                      </label>
                      <input
                        type="number"
                        id="tax"
                        name="tax"
                        value={settings.tax}
                        onChange={handleSettingsChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="serviceCharges"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Service Charges (%)
                      </label>
                      <input
                        type="number"
                        id="serviceCharges"
                        name="serviceCharges"
                        value={settings.serviceCharges}
                        onChange={handleSettingsChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={handleEditClick}
                          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Edit
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={handleCancelClick}
                            className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveSettings}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          >
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

            {isPaymentPopupVisible && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl payment-popup">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Payment Gateway
                    </h2>
                    <button
                      onClick={handleCancelClick}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTimes size={24} />
                    </button>
                  </div>
                  <form>
                    <div className="mb-4">
                      <label
                        htmlFor="keyId"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Key ID
                      </label>
                      <input
                        type="password"
                        id="keyId"
                        name="keyId"
                        value={settings.keyId}
                        onChange={handleSettingsChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        htmlFor="secretKey"
                        className="block mb-2 text-sm font-medium text-gray-700"
                      >
                        Secret Key
                      </label>
                      <input
                        type="password"
                        id="secretKey"
                        name="secretKey"
                        value={settings.secretKey}
                        onChange={handleSettingsChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={handleEditClick}
                          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Edit
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={handleCancelClick}
                            className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveSettings}
                            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                          >
                            Save
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            )}

{isChangePasswordPopupVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl change-password-popup">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Change Password</h2>
              <button onClick={() => setChangePasswordPopupVisible(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes size={24} />
              </button>
            </div>
            <form onSubmit={handleChangePassword}>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setChangePasswordPopupVisible(false)}
                  className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

{isCreateAdminPopupVisible && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl create-admin-popup">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Create Admin</h2>
        <button
          onClick={() => setCreateAdminPopupVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>
      </div>
      <form onSubmit={handleCreateAdmin}>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => setCreateAdminPopupVisible(false)}
            className="px-4 py-2 text-gray-900 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
)}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default AdminNav;
