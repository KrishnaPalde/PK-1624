import React, { useMemo, useEffect, useState } from "react";
import PriceDetail from "./PriceDetail";
import DateDisplay from "./DateDisplay";
import StayInfo from "./StayInfo";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import { useBooking } from "../contexts/BookingFormContext";
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
          <div className="flex flex-col items-center self-stretch my-auto rotate-[-1.5707963267948966rad]">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4b2528a440ce9044ce459c414a6ae29a23f6c01902220bba421f06d6573fecd3?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt=""
              className="object-contain w-9"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/41a77514d3cff143a87a5a3792ee9951c9f10a760b8b404ce1d4a8c3c9db1f42?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt=""
              className="object-contain w-8 mt-6 aspect-square"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/83703101909837f4d433e817cc649aba33731f1d6fd8e4448b545d82ce40fcf8?apiKey=e6b8c17325a24fb29c274ce450ea26a7&&apiKey=e6b8c17325a24fb29c274ce450ea26a7"
              alt=""
              className="object-contain mt-6 w-9"
            />
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

        <div className="flex-1 shrink gap-2.5 self-stretch px-2 py-2 mt-4 max-w-full text-xl text-center text-white bg-sky-400 rounded w-[150px]">
          <PaymentButton 
            roomData={roomData} 
            formData={{ ...bookingInfo, ...formData }}
            amount={totalPrice}
            adults={bookingInfo.adults}
            children={bookingInfo.children}
          />
        </div>
      </div>
    </section>
  );
}

export default StayDetails;
