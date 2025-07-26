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
  useEffect(() => {
  onFormDataChange({
    ...formData,
    guestDetails,
  });
}, [formData, guestDetails, onFormDataChange]);


  if (!roomData) {
    useEffect(() => {
      navigate("/");
    }, [navigate]);

    return <div>No room data available. Redirecting...</div>;
  }

  return (
    <div className="flex flex-col max-w-full sm:max-w-[480px] px-4 sm:px-0">
  {/* Heading */}
  <div className="self-start text-3xl font-extrabold text-[#255d69] tracking-tight mb-1">
    Your Booking Details
  </div>

  {/* Creative Caption */}
  <p className="text-sm sm:text-base text-gray-600 font-medium italic mb-6 leading-relaxed mt-4">
    Fill in your details to confirm your escape - your perfect stay is just a few steps away.
  </p>

  {/* Form Section */}
  <div className="flex flex-col w-full bg-white border border-gray-200 rounded-xl shadow-lg px-6 py-6 space-y-6 transition-all">
    {/* Personal Information Fields */}
    <div className="flex flex-col items-start w-full gap-6 sm:flex-row">
      {/* First Name Field */}
      <div className="flex flex-col flex-1 w-full">
        <label
          className="text-sm font-semibold text-gray-700 tracking-wide mb-1"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="John"
          className="px-4 py-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#255d69] text-gray-800 text-base"
        />
      </div>

      {/* Last Name Field */}
      <div className="flex flex-col flex-1 w-full">
        <label
          className="text-sm font-semibold text-gray-700 tracking-wide mb-1"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Doe"
          className="px-4 py-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#255d69] text-gray-800 text-base"
        />
      </div>
    </div>

    {/* Email Field */}
    <div className="flex flex-col w-full">
      <label
        className="text-sm font-semibold text-gray-700 tracking-wide mb-1"
        htmlFor="email"
      >
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleInputChange}
        className="px-4 py-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#255d69] text-gray-800 text-base"
      />
    </div>

    {/* Phone Number Field */}
    <div className="flex flex-col w-full">
      <label
        className="text-sm font-semibold text-gray-700 tracking-wide mb-1"
        htmlFor="phoneNumber"
      >
        Phone Number
      </label>
      <div className="rounded-lg border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-[#255d69]">
        <PhoneInput
          id="phoneNumber"
          defaultCountry="IN"
          placeholder="Enter your phone number"
          maxLength={12}
          value={formData.phoneNumber}
          onChange={(value) => handleInputChange(value)}
          className="w-full px-4 py-3 text-base text-gray-800 bg-white rounded-lg focus:outline-none"
        />
      </div>
    </div>

    {/* ID Number Field */}
    <div className="flex flex-col w-full">
      <label
        className="text-sm font-semibold text-gray-700 tracking-wide mb-1"
        htmlFor="idNumber"
      >
        Aadhar / Passport Number
      </label>
      <input
        id="idNumber"
        type="text"
        placeholder="xxxx-xxxx-xxxx"
        value={formData.idNumber}
        onChange={handleInputChange}
        className="px-4 py-3 w-full rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#255d69] text-gray-800 text-base"
      />
    </div>
  </div>
</div>

  );
}

export default YourBookingDetailsForm;
