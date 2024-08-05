const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Bookings");

const razorpay = new Razorpay({
  key_id: "YOUR_KEY_ID",
  key_secret: "YOUR_KEY_SECRET",
});

// Create an order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body; // Amount in rupees

  const options = {
    amount: amount * 100, // Convert amount to paise
    currency: "INR",
    receipt: crypto.randomBytes(16).toString("hex"),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle payment verification
router.post("/payment-verification", async (req, res) => {
  const secret = "YOUR_WEBHOOK_SECRET"; // Replace with your webhook secret
  const body = JSON.stringify(req.body);
  const sig = req.headers["x-razorpay-signature"];
  const generatedSig = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  if (sig === generatedSig) {
    // Payment is verified, proceed with creating the booking
    const { orderId, paymentId, amount, bookingDetails } = req.body;

    try {
      // Create a unique booking ID
      const bookingId = crypto.randomBytes(16).toString("hex");

      // Create a new booking entry
      const booking = new Booking({
        bookingId,
        firstName: bookingDetails.firstName,
        lastName: bookingDetails.lastName,
        email: bookingDetails.email,
        phoneNumber: bookingDetails.phoneNumber,
        idDocument: bookingDetails.idDocument,
        roomId: bookingDetails.roomId,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        paymentStatus: "completed",
        totalPayment: amount,
        paymentBreakdown: [
          {
            description: "Booking Payment",
            amount,
          },
        ],
        numberOfAdults: bookingDetails.numberOfAdults,
        numberOfChildren: bookingDetails.numberOfChildren,
        numberOfInfants: bookingDetails.numberOfInfants,
        transactions: [
          {
            transactionId: paymentId,
            orderId,
            paymentId,
            paymentMethod: "card", // Example; use actual payment method if available
            amount,
            currency: "INR",
            paymentStatus: "success",
            paymentDescription: "Payment for booking",
            refundStatus: "not refunded",
            refundAmount: 0,
            transactionDetails: req.body,
          },
        ],
      });

      console.log(booking);

      await booking.save();
      res.json({ status: "success", message: "Booking created successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid signature" });
  }
});

module.exports = router;
