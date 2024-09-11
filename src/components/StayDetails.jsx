import React, { useMemo, useEffect, useState } from "react";
import PriceDetail from "./PriceDetail";
import DateDisplay from "./DateDisplay";
import StayInfo from "./StayInfo";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import { useBooking } from "../contexts/BookingFormContext";
import { HiMiniHomeModern } from "react-icons/hi2";
import axios from "axios";
const process = import.meta.env;

function StayDetails({ formData }) {
  const location = useLocation();
  const navigate = useNavigate();
  const roomData = location.state;

  const [globalSettings, setGlobalSettings] = useState({
    tax: 0,
    serviceCharges: 0
  });

  useEffect(() => {
    if (!roomData) {
      navigate("/");
    } else {
      const fetchGlobalSettings = async () => {
        try {
          const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/global-settings`);
          setGlobalSettings(response.data.roomTaxesAndCharges);
        } catch (error) {
          console.error("Failed to fetch global settings", error);
        }
      };

      fetchGlobalSettings();
    }
  }, [navigate, roomData]);

  const { bookingInfo } = useBooking();

  if (!bookingInfo.checkIn) {
    return <div>No room data available. Please select booking details.</div>;
  }

  const calculateNights = useMemo(() => {
    const checkInDate = new Date(bookingInfo.checkIn);
    const checkOutDate = new Date(bookingInfo.checkOut);
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }, [bookingInfo.checkIn, bookingInfo.checkOut]);

  const countGuests = useMemo(() => {
    const totalCountOfGuests = bookingInfo.adults + bookingInfo.children;
    return totalCountOfGuests;
  }, [bookingInfo.adults, bookingInfo.children]);

  const priceDetails = useMemo(() => {
    const baseFare = roomData.price * calculateNights;
    const discount = 0;
    const taxes = Math.round(baseFare * (globalSettings.tax / 100));
    const serviceFee = Math.round(countGuests * globalSettings.serviceCharges); 

    return [
      { label: `Base Fare (${calculateNights} night${calculateNights === 1 ? '' : 's'})`, amount: baseFare },
      { label: "Taxes", amount: taxes },
      { label: "Service Fee", amount: serviceFee },
    ];
  }, [roomData.price, calculateNights, countGuests, globalSettings]);

  const totalPrice = useMemo(() => {
    return priceDetails.reduce((sum, detail) => sum + detail.amount, 0);
  }, [priceDetails]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <section className="flex flex-col rounded-xl">
      <h1 className="self-start ml-9 text-2xl font-bold text-neutral-900 max-md:ml-2.5">
        Your Stay Details
      </h1>
      <div className="flex flex-col w-full p-6 overflow-hidden bg-white shadow-sm rounded-xl max-md:px-5 max-md:max-w-full">
        <StayInfo {...roomData} />
        <div className="flex items-center justify-between w-full mt-4 gap-9 max-md:max-w-full">
          <DateDisplay date={formatDate(bookingInfo.checkIn)} type="Check-In" />
          <div className="flex flex-row items-center self-stretch justify-between my-auto ">
            <div className="rotate-[-1.5707963267948966rad]">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="4" cy="12" r="3" fill="#335064" />
      <line x1="7" y1="12" x2="24" y2="12" stroke="#335064" strokeWidth="2" />
    </svg>    
            </div>
            <HiMiniHomeModern className="w-8 h-8 mx-4 text-[#335064]"/>
            <div className="rotate-[-1.5707963267948966rad]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="20" cy="12" r="3" fill="#335064" />
  <line x1="0" y1="12" x2="17" y2="12" stroke="#335064" strokeWidth="2" />
</svg>        
            </div>

          </div>
          <DateDisplay date={formatDate(bookingInfo.checkOut)} type="Check-Out" />
        </div>

        <p className="mt-4 text-base font-medium text-neutral-900">
          Duration of stay: <span className="font-bold">{calculateNights} night{calculateNights === 1 ? '' : 's'}</span>
        </p>

        <p className="mt-4 text-base font-medium text-neutral-900">
          Your booking is protected by{" "}
          <span className="font-bold">Tranquil Trails</span>
        </p>
        <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
        <div className="flex flex-col w-full mt-4 text-base text-neutral-900 max-md:max-w-full">
          <h2 className="font-semibold">Price Details</h2>
          {priceDetails.map((detail, index) => (
            <PriceDetail
              key={index}
              label={detail.label}
              amount={formatCurrency(detail.amount)}
            />
          ))}
        </div>
        <hr className="w-full mt-4 bg-neutral-900 bg-opacity-30" />
        <div className="flex items-start justify-between w-full gap-10 mt-4 text-base text-neutral-900 max-md:max-w-full">
          <div className="font-medium">Total </div>
          <div className="font-semibold">{formatCurrency(totalPrice)}</div>
        </div>

        <div className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 mt-4 max-w-full text-xl text-center text-white  rounded w-[150px]">
          <PaymentButton 
            roomData={roomData} 
            formData={{ ...bookingInfo, ...formData }}
            amount={totalPrice}
            adults={bookingInfo.adults}
            children={bookingInfo.children}
            priceDetails={priceDetails}
          />
        </div>
      </div>
    </section>
  );
}

export default StayDetails;
