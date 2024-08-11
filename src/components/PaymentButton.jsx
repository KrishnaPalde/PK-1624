// src/components/PaymentButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentButton = ({ amount }) => {
  const navigate = useNavigate();
  const handlePayment = async () => {
    try {
      // Create an order on the server
      // const response = await fetch('http://localhost:4444/api/payments/create-order', {
      const response = await fetch('https://pk-1624.onrender.com/api/payments/create-order', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });

      const { orderId } = await response.json();

      // Test booking details
      const bookingDetails = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phoneNumber: '1234567890',
        idDocument: '123456789012', // Example Aadhar number
        roomId: 'room_001',
        checkInDate: new Date().toISOString(),
        checkOutDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
        numberOfAdults: 2,
        numberOfChildren: 1,
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
          // const verificationResponse = await fetch('http://localhost:4444/api/payments/verify-payment', {
            const verificationResponse = await fetch('https://pk-1624.onrender.com/api/payments/verify-payment', {
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
            navigate('/bookingconfirm')
            
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
