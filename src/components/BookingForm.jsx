import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useBooking } from '../contexts/BookingFormContext';
import { IoPersonSharp, IoPeopleSharp } from "react-icons/io5";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaHotel } from "react-icons/fa"; // Import hotel icon
import axios from 'axios';
const process = import.meta.env;

function BookingForm() {
  const navigate = useNavigate();
  const { bookingInfo, updateBookingInfo } = useBooking();
  const location = useLocation();
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [checkIn, setCheckIn] = useState(() => {
    const storedDate = bookingInfo.checkIn ? new Date(bookingInfo.checkIn) : null;
    return (storedDate && storedDate > today) ? storedDate : today;
  });

  const [checkOut, setCheckOut] = useState(() => {
    const storedDate = bookingInfo.checkOut ? new Date(bookingInfo.checkOut) : null;
    return (storedDate && storedDate > checkIn) ? storedDate : tomorrow;
  });

  const [adults, setAdults] = useState(bookingInfo.adults || 2);
  const [children, setChildren] = useState(bookingInfo.children || 0);
  const [rooms, setRooms] = useState(bookingInfo.rooms || 1);
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);

  const [unavailableDates, setUnavailableDates] = useState([]);
 
  useEffect(() => {
    setCheckIn(new Date(bookingInfo.checkIn) || today);
    setCheckOut(new Date(bookingInfo.checkOut) || tomorrow);
    setAdults(bookingInfo.adults || 2);
    setChildren(bookingInfo.children || 0);
    setRooms(bookingInfo.rooms || 1);
  }, [bookingInfo]);

  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try { 
        const response = await axios.get(`${process.VITE_HOST_URL}/api/unavailable_dates`);
        setUnavailableDates(response.data.unavailableDates.map(date => new Date(date)));
      } catch (error) {
        console.error('Error fetching unavailable dates:', error);
      }
    };

    fetchUnavailableDates();
  }, []);

  const handleCheckInChange = (date) => {
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      setCheckIn(date);
      setCheckOut(nextDay);
      updateBookingInfo({ checkIn: date, checkOut: nextDay });
    }
  };

  const handleCheckOutChange = (date) => {
    if (!date || isNaN(date.getTime())) {
      console.error('Invalid date selected');
      return;
    }
    if (date <= checkIn) {
      console.error('Check-out date must be after check-in date');
      return;
    }
    setCheckOut(date);
    updateBookingInfo({ checkOut: date });
  };

  const updateRoomCountBasedOnGuests = (newAdults, newChildren) => {
    const totalGuests = newAdults + newChildren;
    const calculatedRooms = Math.ceil(totalGuests / 3);
    setRooms(calculatedRooms);
    updateBookingInfo({ rooms: calculatedRooms });
  };

  const handleAdultsChange = (type) => {
    if(adults == 12 && type === "increment") return;
      const newAdults = type === "increment" ? adults + 1 : (adults > 1 ? adults - 1 : 1);
      setAdults(newAdults);
      updateBookingInfo({ adults: newAdults });
      updateRoomCountBasedOnGuests(newAdults, children);
  };

  const handleChildrenChange = (type) => {
    if(children == 10 && type === "increment") return;
    const newChildren = type === "increment" ? children + 1 : (children > 0 ? children - 1 : 0);
    setChildren(newChildren);
    updateBookingInfo({ children: newChildren });
    updateRoomCountBasedOnGuests(adults, newChildren);
  };

  const handleRoomsChange = (type) => {
    const newRooms = type === "increment" ? rooms + 1 : (rooms > 1 ? rooms - 1 : 1);
    setRooms(newRooms);
    updateBookingInfo({ rooms: newRooms });
  };

  const handleGuestDropdownToggle = () => {
    setIsGuestDropdownOpen(!isGuestDropdownOpen);
  };

  const handleApplyGuests = () => {
    setIsGuestDropdownOpen(false);
    updateBookingInfo({ adults, children, rooms });
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    // try {
      // const response = await axios.get(`${process.VITE_HOST_URL}/api/check_availability_dates`, {
      //   params: {
      //     checkinDate: checkIn.toISOString(),
      //     checkoutDate: checkOut.toISOString(),
      //     rooms: rooms,
      //   },
      // });

      // if (response.data.available) {
        updateBookingInfo({ checkIn, checkOut, adults, children, rooms });
        if(location.pathname === "/bookings"){
          window.location.reload();
        }
        navigate("/bookings");
      // } else {
        // console.log("Selected dates or rooms are not available. Please choose different options.");
      // }
    // } catch (error) {
    //   console.log("An error occurred. Please try again.");
    //   console.error("Error checking availability:", error);
    // }
  };

   return (
    <form onSubmit={handleSearch} className="mb-5 w-full max-w-[1224px] bg-white rounded-2xl border border-solid border-zinc-200 shadow-[0px_4px_30px_rgba(36,76,236,0.15)] p-7 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-medium text-black">Book a Room</h2>
          <p className="mt-2 text-sm text-zinc-600">Discover the perfect space for you!</p>
        </div>
        <Link to='/faq' className='flex items-center hover:underline'>
        <IoPersonSharp className='text-[#335064] mr-2'/>
        <span>Need some help?</span>
        </Link>
      </div>
      <div className="flex flex-col items-start gap-5 p-5 bg-white border border-solid md:flex-row rounded-2xl border-zinc-200">
        <div className="flex-1 space-y-2 md:w-1/4">
          <label htmlFor="checkIn" className="text-sm font-medium text-neutral-500">
            Check In
          </label>
          <div className="flex items-center gap-2">
            <RiCalendarScheduleFill className='text-[#335064] w-4 h-4'/>
            <DatePicker
              id="checkIn"
              selected={checkIn}
              onChange={handleCheckInChange}
              dateFormat="dd/MM/yyyy"
              className="w-full text-base font-medium bg-transparent focus:outline-none"
              minDate={new Date()} 
              maxDate={new Date().setDate(new Date().getDate() + 364)} 
              excludeDates={unavailableDates} 
            />
          </div>
        </div>

        <div className="hidden w-px md:block h-14 bg-zinc-200"></div>

        <div className="flex-1 space-y-2 md:w-1/4">
          <label htmlFor="checkOut" className="text-sm font-medium text-neutral-500">
            Check Out
          </label>
          <div className="flex items-center gap-2">
            <RiCalendarScheduleFill className='text-[#335064] w-4 h-4'/>
            <DatePicker
              id="checkOut"
              selected={checkOut instanceof Date && !isNaN(checkOut.getTime()) ? checkOut : new Date()}
              onChange={handleCheckOutChange}
              dateFormat="dd/MM/yyyy"
              className="w-full text-base font-medium bg-transparent focus:outline-none"
              minDate={tomorrow}  
              maxDate={new Date(today.setDate(today.getDate() + 364))}  
              excludeDates={unavailableDates}  
            />
          </div>
        </div>

        <div className="hidden w-px md:block h-14 bg-zinc-200"></div>

        <div className="relative flex-1 w-full md:w-1/3">
          <label className="text-sm font-medium text-neutral-500">Guest & Rooms</label>
          <div 
            className="flex items-center p-2 rounded-md cursor-pointer"
            onClick={handleGuestDropdownToggle}
          >
            <IoPeopleSharp className='w-4 h-4 mr-2 text-[#335064]'/>
            <span className="text-base font-medium">
              {adults} Adults, {children} Children, {rooms} {rooms === 1 ? 'Room' : 'Rooms'}
            </span>
          </div>
          {isGuestDropdownOpen && (
            <div className="absolute left-0 z-10 w-full p-8 mt-2 bg-white border border-gray-300 rounded-md shadow-lg top-full">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Adults</h3>
                    <p className="text-sm text-gray-500">Aged 12+</p>
                  </div>
                  <div className="flex items-center md:gap-2">
                    <button type="button" onClick={() => handleAdultsChange("decrement")} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
                    <span className="w-8 text-lg font-medium text-center">{adults}</span>
                    <button type="button" onClick={() => handleAdultsChange("increment")} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Children</h3>
                    <p className="text-sm text-gray-500">Aged 0 to 11</p>
                  </div>
                  <div className="flex items-center md:gap-2">
                    <button type="button" onClick={() => handleChildrenChange("decrement")} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
                    <span className="w-8 text-lg font-medium text-center">{children}</span>
                    <button type="button" onClick={() => handleChildrenChange("increment")} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
                  </div>
                </div>
                 <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Rooms</h3>
                    <p className="text-sm text-gray-500">From 1 to 4</p>
                  </div>
                  <div className="flex items-center md:gap-2">
                    <button type="button" onClick={() => handleRoomsChange("decrement")} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">-</button>
                    <span className="w-8 text-lg font-medium text-center">{rooms}</span>
                    <button type="button" onClick={() => handleRoomsChange("increment")} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full hover:bg-gray-300">+</button>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleApplyGuests}
                className="w-full py-2 mt-4 text-white transition-colors duration-300 bg-[#255d69] hover:bg-[#243947] rounded-md"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        <div className="flex-none mt-4 md:self-end md:mt-0">
          <button
            type="submit"
            className="flex items-center gap-3 px-8 py-4 text-base font-medium text-white transition-colors duration-300 rounded-full bg-[#255d69] hover:bg-[#243947]"
          >
            <FaHotel className="w-5 h-5" />
            <span>Search</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default BookingForm;