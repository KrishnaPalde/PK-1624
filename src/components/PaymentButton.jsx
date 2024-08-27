// src/components/PaymentButton.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useBooking } from '../contexts/BookingFormContext';

const PaymentButton = ({ roomData, formData, adults, children, amount, onClick }) => {

  const navigate = useNavigate();
  const { bookingInfo } = useBooking();
  const location = useLocation();
  const handlePayment = async () => {
    // onClick();
    try {
      // Create an order on the server
      const response = await fetch('http://localhost:4444/api/payments/create-order', {
      // const response = await fetch('https://pk-1624.onrender.com/api/payments/create-order', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const { orderId } = await response.json();

      // Test booking details
      const bookingDetails = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        idDocument: formData.idNumber, // Example Aadhar number
        roomId: roomData.id,
        // checkInDate: new Date().toISOString(),
        checkInDate: bookingInfo.checkIn.toISOString(),
        // checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        checkOutDate: bookingInfo.checkOut.toISOString(),
        numberOfAdults: adults,
        numberOfChildren: children,
        numberOfInfants: 0
      };

      // Configure Razorpay options
      const options = {
        key: 'rzp_test_3XPl2MOocYaXjD', // Replace with your Razorpay Key ID
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Tantra Technologies',
        description: 'Booking Payment',
        order_id: orderId,
        handler: async function (response) {
          // Verify payment on server
          const verificationResponse = await fetch('http://localhost:4444/api/payments/verify-payment', {
            // const verificationResponse = await fetch('https://pk-1624.onrender.com/api/payments/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              amount, // Include amount to verify
              bookingDetails // Include booking details
            })
          });

          const result = await verificationResponse.json();

          if (result.status === 'success') {
            // alert('Payment successful!');
            const idn = result.id;
            // navigate(`/room/${roomData.id}/bookingconfirm`,  { state: {roomData, formData} })
            await axios.get(`http://localhost:4444/api/booking-confirmation/${idn}`);
            navigate(`/room/${roomData.id}/bookingconfirm`,  { state: {roomData, formData} });
            
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: bookingDetails.firstName,
          email: bookingDetails.email,
          contact: bookingDetails.phoneNumber
        }
      };

      // Open Razorpay checkout
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <button onClick={handlePayment} className=''>Pay {amount} INR</button>
  );
};

export default PaymentButton;
