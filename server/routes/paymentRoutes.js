// src/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Bookings");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const razorpay = new Razorpay({
  key_id: "rzp_test_3XPl2MOocYaXjD",
  key_secret: "UfRM9Kdwj7sVapSQxsHEX4PS",
});

// Create an order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  const options = {
    amount: amount * 100, // Amount in paise
    currency: "INR",
    receipt: crypto.randomBytes(16).toString("hex"),
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order.id);
    res.json({ orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
router.post("/verify-payment", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    bookingDetails,
  } = req.body;

  // Construct the expected signature
  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  console.log(req.body);
  console.log(razorpay_signature);

  const isValidSignature = validateWebhookSignature(
    body,
    razorpay_signature,
    secret
  );
  if (isValidSignature) {
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
            transactionId: razorpay_payment_id,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            paymentMethod: "card",
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

      await booking.save();
      res
        .status(200)
        .json({ status: "success", message: "Booking created successfully" , id:bookingId,});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid signature" });
  }
});

module.exports = router;
