import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../contexts/BookingFormContext';
import TransactionSpinner from './TransactionSpinner'; 
const process = import.meta.env;

function getRoomType(rooms) {
  if (!Array.isArray(rooms) || rooms.length === 0) {
    throw new Error("Rooms array is required and must not be empty.");
  }

  // Check if the array contains only one room and its name is "Panoramic View"
  if (rooms.length === 1 && rooms[0].isProperty) {
    return { roomType: "entire", roomCount: 1 };
  }

  // Count the total number of rooms and return "single" as roomType
  const roomCount = rooms.length;
  return { roomType: "single", roomCount };
}



function calculateDatesBetween(checkIn, checkOut) {
  const formattedDates = [];
  let currentDate = new Date(checkIn);

  const checkOutDate = new Date(checkOut); // Convert checkOut to a Date object

  while (currentDate < checkOutDate) {
    formattedDates.push(currentDate.toISOString().split("T")[0]); // Format as "YYYY-MM-DD"
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return formattedDates;
}


const PaymentButton = ({ roomData, formData, adults, children, amount, priceDetails,calculateNights, isDisabled }) => {
  const navigate = useNavigate();
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalSettings, setGlobalSettings] = useState(null);

  // var baseFare = 0;
  // var taxes = 0;
  // var serviceFee = 0;
  // var discount = 0;

  // let testing = false;
  // if(testing){
  //   amount = 1;
  //   baseFare = 0.90;
  //   taxes = 0.05;
  //   serviceFee = 0.05;
  //    discount = 0;
  // } else {
    const baseFare = priceDetails.find(detail => detail.label.startsWith('Base Fare'))?.amount || 0;
    const taxes = priceDetails.find(detail => detail.label === 'Taxes')?.amount || 0;
    const serviceFee = priceDetails.find(detail => detail.label === 'Service Fee')?.amount || 0;
    const discount = Math.abs(priceDetails.find(detail => detail.label === 'Discount')?.amount || 0).toLocaleString('en-IN'); 
  // }
  

  useEffect(() => {
    const fetchGlobalSettings = async () => {
      try {
        const response = await axios.get(`${process.VITE_HOST_URL}/api/admin/gateway-settings`);
        setGlobalSettings(response.data);
      } catch (error) {
        console.error('Error fetching global settings:', error);
      }
    };

    fetchGlobalSettings();
  }, []);
  
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      
      const response = await fetch(`${process.VITE_HOST_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, baseFare, taxes, serviceFee })
      });

      const { orderId } = await response.json();

      const rooms = roomData.map(room => ({
        id: room.id,
        name: room.name,
        price: room.price
      }));

      const bookingDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        idDocument: formData.idNumber,
        rooms: rooms,
        checkInDate: bookingInfo.checkIn.toISOString(),
        checkOutDate: bookingInfo.checkOut.toISOString(),
        numberOfAdults: adults,
        numberOfChildren: children,
        numberOfInfants: 0,
      };

      const options = {
        key: globalSettings.paymentGateway.keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'Tranquil Trails',
        description: 'Bookings Payment',
        order_id: orderId,
        handler: async function (response) {
          const verificationResponse = await fetch(`${process.VITE_HOST_URL}/api/payments/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount,
              baseFare,
              taxes,
              serviceFee,
              discount,
              bookingDetails
            })
          });

          const result = await verificationResponse.json();

          if (result.status === 'success') {
            const idn = result.id;
            const dates = calculateDatesBetween(bookingInfo.checkIn.toISOString(),bookingInfo.checkOut.toISOString())
            const roomTypeResponse = getRoomType(rooms);
            const roomType = roomTypeResponse[roomType];
            const roomCount = roomTypeResponse[roomCount];
            const source = "website";
            const response = await axios.post(`${process.VITE_HOST_URL}/api/add-event`, { dates, roomType, source, roomCount })
            console.log(response.status);
            await axios.get(`${process.VITE_HOST_URL}/api/booking-confirmation/${idn}`);
            setIsProcessing(false);
            navigate(`/room/bookingconfirm`, { state: { roomData, formData, bookingId: idn, rooms } });
          } else {
            setIsProcessing(false);
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: bookingDetails.firstName,
          email: bookingDetails.email,
          contact: bookingDetails.phoneNumber
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false);
          }
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <>
      <button 
  disabled={isDisabled}
  onClick={handlePayment}
  className={`w-full py-3 px-2 text-xl text-white transition duration-300 rounded-md 
    ${isDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#255d69] hover:bg-[#243947]'}`}
>
        Pay {new Intl.NumberFormat().format(amount)} INR
      </button>
      {isProcessing && <TransactionSpinner />}
    </>
  );
};

export default PaymentButton;