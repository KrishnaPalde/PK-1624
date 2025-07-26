// src/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Bookings");
const GlobalSetting = require("../models/GlobalSetting");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");

const fetchKeyId = async () => {
  try {
    const settings = await GlobalSetting.findOne();
    if (!settings) {
      console.log("critical error");
      return;
    }

    return settings.paymentGateway.keyId;
  } catch (error) {
    console.error("Error fetching global settings:", error);
  }
};

const fetchSecretKey = async () => {
  try {
    const settings = await GlobalSetting.findOne();
    if (!settings) {
      console.log("critical error");
      return;
    }

    return settings.paymentGateway.secretKey;
  } catch (error) {
    console.error("Error fetching global settings:", error);
  }
};

// const razorpay = new Razorpay({
//   key_id: "rzp_test_3XPl2MOocYaXjD",
//   key_secret: "UfRM9Kdwj7sVapSQxsHEX4PS",
// });

var razorpay;

// Create an order
router.post("/create-order", async (req, res) => {
  const id = await fetchKeyId();
  const secret_key = await fetchSecretKey();
  console.log("");
  razorpay = new Razorpay({
    key_id: id,
    key_secret: secret_key,
  });
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
// router.post("/verify-payment", async (req, res) => {
//   const id = await fetchKeyId();
//   const secret_key = await fetchSecretKey();
//   razorpay = new Razorpay({
//     key_id: id,
//     key_secret: secret_key,
//   })

//   const {
//     razorpay_order_id,
//     razorpay_payment_id,
//     razorpay_signature,
//     amount,
//     bookingDetails,
//   } = req.body;

//   // Construct the expected signature
//   const secret = razorpay.key_secret;
//   const body = razorpay_order_id + "|" + razorpay_payment_id;

//   console.log(req.body);
//   console.log(razorpay_signature);

//   const isValidSignature = validateWebhookSignature(
//     body,
//     razorpay_signature,
//     secret
//   );
//   if (isValidSignature) {
//     try {
//       // Create a unique booking ID
//       const bookingId = crypto.randomBytes(16).toString("hex");

//       // Create a new booking entry
//       const booking = new Booking({
//         bookingId,
//         firstName: bookingDetails.firstName,
//         lastName: bookingDetails.lastName,
//         email: bookingDetails.email,
//         phoneNumber: bookingDetails.phoneNumber,
//         idDocument: bookingDetails.idDocument,
//         roomId: bookingDetails.roomId,
//         checkInDate: bookingDetails.checkInDate,
//         checkOutDate: bookingDetails.checkOutDate,
//         paymentStatus: "completed",
//         totalPayment: amount,
//         paymentBreakdown: [
//           {
//             description: "Booking Payment",
//             amount,
//           },
//         ],
//         numberOfAdults: bookingDetails.numberOfAdults,
//         numberOfChildren: bookingDetails.numberOfChildren,
//         numberOfInfants: bookingDetails.numberOfInfants,
//         transactions: [
//           {
//             transactionId: razorpay_payment_id,
//             orderId: razorpay_order_id,
//             paymentId: razorpay_payment_id,
//             paymentMethod: "card",
//             amount,
//             currency: "INR",
//             paymentStatus: "success",
//             paymentDescription: "Payment for booking",
//             refundStatus: "not refunded",
//             refundAmount: 0,
//             transactionDetails: req.body,
//           },
//         ],
//       });

//       await booking.save();
//       res
//         .status(200)
//         .json({ status: "success", message: "Booking created successfully" , id:bookingId,});
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     res.status(400).json({ error: "Invalid signature" });
//   }
// });

// Verify payment

// router.post("/verify-payment", async (req, res) => {
//   try {
//     const id = await fetchKeyId();
//     const secret_key = await fetchSecretKey();

//     if (!id || !secret_key) {
//       console.error("Failed to fetch Razorpay credentials");
//       return res.status(500).json({ error: "Failed to fetch Razorpay credentials" });
//     }

//     const razorpay = new Razorpay({
//       key_id: id,
//       key_secret: secret_key,
//     });

//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       amount,
//       baseFare,
//       taxes,
//       serviceFee,
//       bookingDetails,
//     } = req.body;

//     console.log("Received payment verification request:", {
//       razorpay_order_id,
//       razorpay_payment_id,
//       amount,
//       baseFare,
//       taxes,
//       serviceFee,
//     });

//     // Validate the Razorpay signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", secret_key)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       console.error("Invalid signature");
//       return res.status(400).json({ error: "Invalid signature" });
//     }

//     // Fetch payment details from Razorpay
//     const payment = await razorpay.payments.fetch(razorpay_payment_id);
//     console.log("Fetched payment details:", payment);

//     // Verify the amount (convert to paise for comparison)
//     const amountInPaise = Math.round(amount * 100);
//     if (payment.amount !== amountInPaise) {
//       console.error("Amount mismatch", { expected: amountInPaise, received: payment.amount });
//       return res.status(400).json({ error: "Amount mismatch" });
//     }

//     // Verify that the sum of baseFare, taxes, and serviceFee equals the total amount
//     const calculatedTotal = parseFloat(baseFare) + parseFloat(taxes) + parseFloat(serviceFee);
//     if (Math.abs(calculatedTotal - amount) > 0.01) {
//       console.error("Payment breakdown mismatch", {
//         baseFare,
//         taxes,
//         serviceFee,
//         calculatedTotal,
//         expectedTotal: amount
//       });
//       return res.status(400).json({ error: "Payment breakdown mismatch" });
//     }

//     // Create a unique booking ID
//     const bookingId = crypto.randomBytes(16).toString("hex");

//     // Create a new booking entry
//     const booking = new Booking({
//       bookingId,
//       firstName: bookingDetails.firstName,
//       lastName: bookingDetails.lastName,
//       email: bookingDetails.email,
//       phoneNumber: bookingDetails.phoneNumber,
//       idDocument: bookingDetails.idDocument,
//       rooms: bookingDetails.rooms.map(room => ({
//         roomId: room.id,
//         roomName: room.name,
//         price: room.price
//       })),
//       checkInDate: bookingDetails.checkInDate,
//       checkOutDate: bookingDetails.checkOutDate,
//       paymentStatus: "completed",
//       totalPayment: amount,
//       paymentBreakdown: [
//         { description: "Base Fare", amount: parseFloat(baseFare) },
//         { description: "Taxes", amount: parseFloat(taxes) },
//         { description: "Service Fee", amount: parseFloat(serviceFee) }
//       ],
//       numberOfAdults: bookingDetails.numberOfAdults,
//       numberOfChildren: bookingDetails.numberOfChildren,
//       numberOfInfants: bookingDetails.numberOfInfants,
//       transactions: [
//         {
//           transactionId: razorpay_payment_id,
//           orderId: razorpay_order_id,
//           paymentId: razorpay_payment_id,
//           paymentMethod: payment.method,
//           amount: amount,
//           currency: payment.currency,
//           paymentStatus: "success",
//           paymentDescription: "Payment for booking",
//           refundStatus: "not refunded",
//           refundAmount: 0,
//           transactionDetails: payment,
//         },
//       ],
//     });

//     await booking.save();
//     console.log("Booking created successfully:", bookingId);

//     res.status(200).json({
//       status: "success",
//       message: "Booking created successfully",
//       id: bookingId,
//     });
//   } catch (error) {
//     console.error("Error in payment verification:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

router.post("/verify-payment", async (req, res) => {
  try {
    const id = await fetchKeyId();
    const secret_key = await fetchSecretKey();

    if (!id || !secret_key) {
      console.error("Failed to fetch Razorpay credentials");
      return res
        .status(500)
        .json({ error: "Failed to fetch Razorpay credentials" });
    }

    const razorpay = new Razorpay({
      key_id: id,
      key_secret: secret_key,
    });

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      baseFare,
      taxes,
      serviceFee,
      discount = 0, // Add discount field with a default value of 0
      bookingDetails,
    } = req.body;

    console.log("Received payment verification request:", {
      razorpay_order_id,
      razorpay_payment_id,
      amount,
      baseFare,
      taxes,
      serviceFee,
      discount, // Log the discount value
    });

    // Validate the Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret_key)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Invalid signature");
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    console.log("Fetched payment details:", payment);

    // Verify the amount (convert to paise for comparison)
    const amountInPaise = Math.round(amount * 100);
    if (payment.amount !== amountInPaise) {
      console.error("Amount mismatch", {
        expected: amountInPaise,
        received: payment.amount,
      });
      return res.status(400).json({ error: "Amount mismatch" });
    }

    // Verify that the sum of baseFare, taxes, and serviceFee minus discount equals the total amount
    const calculatedTotal =
      parseFloat(baseFare) +
      parseFloat(taxes) +
      parseFloat(serviceFee) -
      parseFloat(discount);
    if (Math.abs(calculatedTotal - amount) > 0.01) {
      console.error("Payment breakdown mismatch", {
        baseFare,
        taxes,
        serviceFee,
        discount, // Include discount in the error log
        calculatedTotal,
        expectedTotal: amount,
      });
      return res.status(400).json({ error: "Payment breakdown mismatch" });
    }

    // Create a unique booking ID
    // 1. Format date as DDMMYYYY
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    const formattedDate = `${dd}${mm}${yyyy}`;

    // 2. Count total bookings in the DB (not just today's)
    const totalBookings = await Booking.countDocuments({});

    // 3. Increment by 1 for the new booking and pad to at least 4 digits
    const nextCount = totalBookings + 1;
    const paddedCount = String(nextCount).padStart(4, "0");

    // 4. Construct booking ID
    const bookingId = `WB-${formattedDate}-${paddedCount}`;

    // Create a new booking entry
    const booking = new Booking({
      bookingId,
      firstName: bookingDetails.firstName,
      lastName: bookingDetails.lastName,
      email: bookingDetails.email,
      phoneNumber: bookingDetails.phoneNumber,
      idDocument: bookingDetails.idDocument,
      rooms: bookingDetails.rooms.map((room) => ({
        roomId: room.id,
        roomName: room.name,
        price: room.price,
      })),
      checkInDate: bookingDetails.checkInDate,
      checkOutDate: bookingDetails.checkOutDate,
      paymentStatus: "completed",
      totalPayment: amount,
      paymentBreakdown: [
        { description: "Base Fare", amount: parseFloat(baseFare) },
        { description: "Taxes", amount: parseFloat(taxes) },
        { description: "Service Fee", amount: parseFloat(serviceFee) },
        { description: "Discount", amount: parseFloat(discount) }, // Include discount in the breakdown
      ],
      numberOfAdults: bookingDetails.numberOfAdults,
      numberOfChildren: bookingDetails.numberOfChildren,
      numberOfInfants: bookingDetails.numberOfInfants,
      transactions: [
        {
          transactionId: razorpay_payment_id,
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          paymentMethod: payment.method,
          amount: amount,
          currency: payment.currency,
          paymentStatus: "success",
          paymentDescription: "Payment for booking",
          refundStatus: "not refunded",
          refundAmount: 0,
          transactionDetails: payment,
        },
      ],
    });

    await booking.save();
    console.log("Booking created successfully:", bookingId);

    res.status(200).json({
      status: "success",
      message: "Booking created successfully",
      id: bookingId,
    });
  } catch (error) {
    console.error("Error in payment verification:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
