import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../contexts/BookingFormContext';
import TransactionSpinner from './TransactionSpinner'; 
const process = import.meta.env;

const PaymentButton = ({ roomData, formData, adults, children, amount, priceDetails }) => {
  const navigate = useNavigate();
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [globalSettings, setGlobalSettings] = useState(null);

  const baseFare = priceDetails.find(detail => detail.label.startsWith('Base Fare'))?.amount || 0;
  const taxes = priceDetails.find(detail => detail.label === 'Taxes')?.amount || 0;
  const serviceFee = priceDetails.find(detail => detail.label === 'Service Fee')?.amount || 0;

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

      const bookingDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        idDocument: formData.idNumber,
        roomId: roomData.id,
        checkInDate: bookingInfo.checkIn.toISOString(),
        checkOutDate: bookingInfo.checkOut.toISOString(),
        numberOfAdults: adults,
        numberOfChildren: children,
        numberOfInfants: 0,
        paymentBreakdown: [
          { description: 'Base Fare', amount: baseFare },
          { description: 'Taxes', amount: taxes },
          { description: 'Service Fee', amount: serviceFee }
        ]
      };

      const options = {
        // key: 'rzp_test_3XPl2MOocYaXjD',
        key: globalSettings.paymentGateway.keyId,
        amount: amount * 100,
        currency: 'INR',
        name: 'Tantra Technologies',
        description: 'Booking Payment',
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
              bookingDetails
            })
          });

          const result = await verificationResponse.json();

          if (result.status === 'success') {
            const idn = result.id;
            await axios.get(`${process.VITE_HOST_URL}/api/booking-confirmation/${idn}`);
            setIsProcessing(false);
            navigate(`/room/${roomData.id}/bookingconfirm`, { state: { roomData, formData } });
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
        onClick={handlePayment}
        className="w-full py-3 px-2 text-xl text-white transition duration-300 rounded-md bg-[#335064] hover:bg-[#243947]"
      >
        Pay {amount} INR
      </button>
      {isProcessing && <TransactionSpinner />}
    </>
  );
};

export default PaymentButton;