import React, { useState, useEffect } from 'react';
import { useBooking } from '../contexts/BookingFormContext';
import PaymentButton from './PaymentButton';
import { useNavigate, useLocation } from 'react-router-dom';
import PriceDetail from './PriceDetail';

function YourBookingDetailsForm() {
  const { bookingInfo, setBookingInfo } = useBooking();

  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;

  if (!roomData) {
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);

    return <div>No room data available. Redirecting...</div>;
  }

  const priceDetails = [
    { label: "Base Fare", amount: "₹2400" },
    { label: "Discount", amount: "₹0" },
    { label: "Taxes", amount: "₹200" },
    { label: "Service Fee", amount: "₹50" },
  ];

  const [adults, setAdults] = useState(bookingInfo.adults || 0);
  const [children, setChildren] = useState(bookingInfo.children || 0);

  const [guestDetails, setGuestDetails] = useState({
    adults: Array(bookingInfo.adults || 0).fill({ name: '', age: '', gender: '' }),
    children: Array(bookingInfo.children || 0).fill({ name: '', age: '', gender: '' }),
  });

  useEffect(() => {
    setAdults(bookingInfo.adults || 0);
    setChildren(bookingInfo.children || 0);
  }, [bookingInfo]);

  useEffect(() => {
    setGuestDetails(prevDetails => ({
      adults: Array(bookingInfo.adults || 0).fill({ name: '', age: '', gender: '' })
        .map((_, i) => prevDetails.adults[i] || { name: '', age: '', gender: '' }),
      children: Array(bookingInfo.children || 0).fill({ name: '', age: '', gender: '' })
        .map((_, i) => prevDetails.children[i] || { name: '', age: '', gender: '' }),
    }));
  }, [bookingInfo.adults, bookingInfo.children]);

  const handleGuestChange = (type, index, field, value) => {
    setGuestDetails(prevDetails => {
      const updatedDetails = { ...prevDetails };
      updatedDetails[type][index] = { ...updatedDetails[type][index], [field]: value };
      return updatedDetails;
    });
  };

  const addGuest = (type) => {
    setBookingInfo(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };
  

  const removeGuest = (type, index) => {
    setGuestDetails(prevDetails => {
      const updatedDetails = { ...prevDetails };
      updatedDetails[type] = updatedDetails[type].filter((_, i) => i !== index);
      return updatedDetails;
    });
  
    setBookingInfo(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1)
    }));
  };

  const handleCheckInChange = (event) => {
    setBookingInfo(prev => ({
      ...prev,
      checkIn: new Date(event.target.value),
    }));
  };

  const handleCheckOutChange = (event) => {
    setBookingInfo(prev => ({
      ...prev,
      checkOut: new Date(event.target.value),
    }));
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    idNumber: '',
  });

  useEffect(() => {
    setFormData({
      firstName: bookingInfo.firstName || '',
      lastName: bookingInfo.lastName || '',
      email: bookingInfo.email || '',
      phoneNumber: bookingInfo.phoneNumber || '',
      idNumber: bookingInfo.idNumber || '',
    });
  }, [bookingInfo]);
  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSave = () => {
    // Update bookingInfo with form data
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      ...formData,
    }));
    alert('Booking details saved successfully!');
  };

  
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
              <label className="text-sm font-medium leading-none text-slate-700" htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
              />
            </div>
            {/* Last Name Field */}
            <div className="flex flex-col flex-1 w-full shrink basis-0 sm:w-auto">
              <label className="text-sm font-medium leading-none text-slate-700" htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
              />
            </div>
          </div>
          {/* Email Field */}
          <div className="flex flex-col w-full mt-6 whitespace-nowrap">
            <label className="text-sm font-medium leading-none text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
            />
          </div>
          {/* Phone Number Field */}
          <div className="flex flex-col w-full mt-6">
            <label className="text-sm font-medium leading-none text-slate-700" htmlFor="phoneNumber">
              Phone number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              placeholder="+91 00000-00000"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="px-4 py-3 mt-1.5 w-full text-base text-gray-500 bg-white rounded-lg border border-gray-300 border-solid shadow-sm"
            />
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
            {/* Check-in / Check-out Dates */}
            <div className="flex gap-10 mt-5 w-full leading-loose text-black max-w-[368px]">
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
            </div>
          </div>
          {/* Guest Details */}
          {/* <div className="flex flex-col w-full mt-6 text-sm font-medium transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between gap-4 leading-none text-slate-700">
              <div className="flex items-center gap-4">
                <div className="flex flex-col w-[100px]">
                  <div className="w-full">Guest Details</div>
                </div>
                <button
                  type="button"
                  onClick={() => addGuest('adults')}
                  className="text-blue-500"
                >
                  Add Adult
                </button>
                <button
                  type="button"
                  onClick={() => addGuest('children')}
                  className="text-blue-500"
                >
                  Add Child
                </button>
              </div>
            </div>
            {guestDetails.adults.map((guest, index) => (
              <div key={`adult-${index}`} className="flex flex-col mt-2">
                <div className="flex gap-5 justify-between mt-2.5 max-w-full leading-loose text-black w-fit">
                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) => handleGuestChange('adults', index, 'name', e.target.value)}
                    placeholder="Adult Name"
                    className="w-full bg-transparent border-none"
                  />
                  <input
                    type="number"
                    value={guest.age}
                    onChange={(e) => handleGuestChange('adults', index, 'age', e.target.value)}
                    placeholder="Age"
                    className="w-16 bg-transparent border-none"
                  />
                  <input
                    type="text"
                    value={guest.gender}
                    onChange={(e) => handleGuestChange('adults', index, 'gender', e.target.value)}
                    placeholder="Gender"
                    className="w-24 bg-transparent border-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeGuest('adults', index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            {guestDetails.children.map((guest, index) => (
              <div key={`child-${index}`} className="flex flex-col mt-2">
                <div className="flex gap-5 justify-between mt-2.5 max-w-full leading-loose text-black w-fit">
                  <input
                    type="text"
                    value={guest.name}
                    onChange={(e) => handleGuestChange('children', index, 'name', e.target.value)}
                    placeholder="Child Name"
                    className="w-full bg-transparent border-none"
                  />
                  <input
                    type="number"
                    value={guest.age}
                    onChange={(e) => handleGuestChange('children', index, 'age', e.target.value)}
                    placeholder="Age"
                    className="w-16 bg-transparent border-none"
                  />
                  <input
                    type="text"
                    value={guest.gender}
                    onChange={(e) => handleGuestChange('children', index, 'gender', e.target.value)}
                    placeholder="Gender"
                    className="w-24 bg-transparent border-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeGuest('children', index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div> */}
          {/* <button
            onClick={handleSave}
            className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Save Details
          </button> */}

          <p className="mt-4 text-base font-medium text-neutral-900">
          Your booking is protected by{" "}
          <span className="font-bold">Tantra Worlds</span>
        </p>
        <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
        <div className="flex flex-col w-full mt-4 text-base text-neutral-900 max-md:max-w-full">
          <h2 className="font-semibold">Price Details</h2>
          {priceDetails.map((detail, index) => (
            <PriceDetail
              key={index}
              label={detail.label}
              amount={detail.amount}
            />
          ))}
        </div>
        <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
        <div className="flex items-start justify-between w-full gap-10 mt-4 text-base text-neutral-900 max-md:max-w-full">
          <div className="font-medium">Total </div>
          <div className="font-semibold">₹2650</div>
        </div>
        
        
        <button className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 mt-4 max-w-full text-xl text-center text-white bg-sky-400 rounded w-[150px]">
          <PaymentButton 
            roomData={roomData} 
            formData={formData}
            amount={roomData.price}
            adults={adults}
            children={children}
            onClick={handleSave}
          />
        
        </button>
       


        </div>
      </div>
    </div>
  );
}

export default YourBookingDetailsForm;
