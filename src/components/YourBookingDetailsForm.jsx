import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useBooking } from "../contexts/BookingFormContext";

function YourBookingDetailsForm({ formData, onFormDataChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;
  const { bookingInfo, updateBookingInfo } = useBooking();

  const [adults, setAdults] = useState(bookingInfo.adults || 0);
  const [children, setChildren] = useState(bookingInfo.children || 0);

  const [guestDetails, setGuestDetails] = useState({
    adults: Array(bookingInfo.adults || 0).fill({
      name: "",
      age: "",
      gender: "",
    }),
    children: Array(bookingInfo.children || 0).fill({
      name: "",
      age: "",
      gender: "",
    }),
  });

  useEffect(() => {
    setAdults(bookingInfo.adults || 0);
    setChildren(bookingInfo.children || 0);
  }, [bookingInfo]);

  useEffect(() => {
    setGuestDetails((prevDetails) => ({
      adults: Array(bookingInfo.adults || 0)
        .fill({ name: "", age: "", gender: "" })
        .map(
          (_, i) => prevDetails.adults[i] || { name: "", age: "", gender: "" }
        ),
      children: Array(bookingInfo.children || 0)
        .fill({ name: "", age: "", gender: "" })
        .map(
          (_, i) => prevDetails.children[i] || { name: "", age: "", gender: "" }
        ),
    }));
  }, [bookingInfo.adults, bookingInfo.children]);

  const handleGuestChange = (type, index, field, value) => {
    setGuestDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      updatedDetails[type][index] = {
        ...updatedDetails[type][index],
        [field]: value,
      };
      return updatedDetails;
    });
  };

  const addGuest = (type) => {
    updateBookingInfo({
      ...bookingInfo,
      [type]: bookingInfo[type] + 1,
    });
  };

  const removeGuest = (type, index) => {
    setGuestDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };
      updatedDetails[type] = updatedDetails[type].filter((_, i) => i !== index);
      return updatedDetails;
    });

    updateBookingInfo({
      ...bookingInfo,
      [type]: Math.max(0, bookingInfo[type] - 1),
    });
  };

  const handleCheckInChange = (event) => {
    updateBookingInfo({
      ...bookingInfo,
      checkIn: new Date(event.target.value),
    });
  };

  const handleCheckOutChange = (event) => {
    updateBookingInfo({
      ...bookingInfo,
      checkOut: new Date(event.target.value),
    });
  };

  const handleInputChange = (e) => {
    // Handle PhoneInput value (string input)
    if (typeof e === "string" || e === undefined) {
      onFormDataChange({
        ...formData,
        phoneNumber: e || ""
      });
    } 
    else {
      const { id, value } = e.target;
      onFormDataChange({
        ...formData,
        [id]: value
      });
    }
  };

  if (!roomData) {
    useEffect(() => {
      navigate("/");
    }, [navigate]);

    return <div>No room data available. Redirecting...</div>;
  }

  return (
    <div className="flex flex-col max-w-full sm:max-w-[480px] px-4 sm:px-0">
      <div className="self-start text-2xl font-bold text-neutral-900">
        Your Booking Details
      </div>
      <div className="flex flex-col mt-4 w-full min-h-[694px]">
        <div className="flex flex-col w-full">
          {/* Personal Information Fields */}
          <div className="flex flex-col items-start w-full gap-8 sm:flex-row">
            {/* First Name Field */}
            <div className="flex flex-col flex-1 w-full shrink basis-0 sm:w-auto">
              <label
                className="text-sm font-medium leading-none text-slate-700"
                htmlFor="firstName"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="px-4 py-3 mt-1.5 w-full text-base text-gray-700 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
              />
            </div>
            {/* Last Name Field */}
            <div className="flex flex-col flex-1 w-full shrink basis-0 sm:w-auto">
              <label
                className="text-sm font-medium leading-none text-slate-700"
                htmlFor="lastName"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="px-4 py-3 mt-1.5 w-full text-base text-gray-700 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="flex flex-col w-full mt-6 whitespace-nowrap">
            <label
              className="text-sm font-medium leading-none text-slate-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-3 mt-1.5 w-full text-base text-gray-700 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
            />
          </div>
          {/* Phone Number Field */}
          <div className="flex flex-col w-full mt-6">
            <label
              className="text-sm font-medium leading-none text-slate-700"
              htmlFor="phoneNumber"
            >
              Phone number
            </label>
            <div className="mt-1.5 rounded-lg border border-gray-300 border-solid shadow-sm">
              <PhoneInput
                id="phoneNumber"
                defaultCountry="IN"
                placeholder="Enter Phone Number"
                maxLength={12}
                pattern="^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$"
                value={formData.phoneNumber}
                onChange={(value) => handleInputChange(value)}
                className="w-full px-4 py-3 text-base text-gray-700 bg-white rounded-lg"
              />
            </div>
          </div>
          {/* ID Number Field */}
          <div className="flex flex-col mt-6 w-full text-sm font-medium min-h-[154px]">
            <label className="leading-none text-slate-700" htmlFor="idNumber">
              Aadhar Number / Passport Number
            </label>
            <input
              id="idNumber"
              type="text"
              placeholder="xxxx-xxxx-xxxx"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="px-4 py-3 mt-2.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
            />

            {/* <div className="flex gap-10 mt-5 w-full leading-loose text-black max-w-[368px]">
              <div className="flex flex-1 gap-2.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/12d727b0b87fb91c58fc7c5facec7e18ecd44e1f125a17015ea63d8dc4e192a4?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                  className="object-contain w-4 my-auto shrink-0 aspect-square"
                  alt="Check-in icon"
                />
                <input
                  type="date"
                  value={bookingInfo.checkIn?.toISOString().split('T')[0] || ''}
                  onChange={handleCheckInChange}
                  className="bg-transparent border-none"
                />
              </div>
              <div className="flex flex-1 gap-1.5">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/768b429679718f8444e98046b5a128227f73183e7350800f6276ed4b8928b64c?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
                  className="object-contain w-4 my-auto shrink-0 aspect-square"
                  alt="Check-out icon"
                />
                <input
                  type="date"
                  value={bookingInfo.checkOut?.toISOString().split('T')[0] || ''}
                  onChange={handleCheckOutChange}
                  className="bg-transparent border-none"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourBookingDetailsForm;
