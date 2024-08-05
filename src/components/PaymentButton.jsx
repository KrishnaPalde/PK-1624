// src/components/PaymentButton.jsx
import React from 'react';

const PaymentButton = ({ amount }) => {
  const handlePayment = async () => {
    try {
      // Create an order on the server
      const response = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
      });
      const { orderId } = await response.json();

      // Configure Razorpay options
      const options = {
        key: 'YOUR_KEY_ID', // Replace with your Razorpay Key ID
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Your Company',
        description: 'Booking Payment',
        order_id: orderId,
        handler: async function (response) {
          // Verify payment on server
          const verificationResponse = await fetch('/api/payment-verification', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response)
          });

          const result = await verificationResponse.json();

          if (result.status === 'success') {
            alert('Payment successful!');
            // Redirect to booking confirmation page
          } else {
            alert('Payment verification failed!');
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
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
    <button onClick={handlePayment}>Pay {amount} INR</button>
  );
};

export default PaymentButton;
