const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema for payment breakdown details
const PaymentBreakdownSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

// Define schema for transaction details
const TransactionSchema = new Schema({
  transactionId: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  transactionDate: { type: Date, default: Date.now },
  paymentStatus: {
    type: String,
    enum: ["success", "pending", "failed"],
    required: true,
  },
  paymentDescription: { type: String },
  refundStatus: {
    type: String,
    enum: ["refunded", "not refunded"],
    default: "not refunded",
  },
  refundAmount: { type: Number, default: 0 },
  transactionDetails: { type: Schema.Types.Mixed },
});

// Define schema for booking details
const BookingSchema = new Schema({
  bookingId: { type: String, required: true, unique: true }, // Unique booking identifier
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  idDocument: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return (
          /^[0-9]{12}$/.test(v) || // Aadhar number (12 digits)
          /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[1-9]$/.test(v) // Passport number (format)
        ); // Aadhar or Passport number validation
      },
      message: (props) =>
        `${props.value} is not a valid Aadhar or Passport number!`,
    },
  },
  roomId: { type: String, required: true }, // Custom room ID
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    required: true,
  },
  totalPayment: { type: Number, required: true },
  paymentBreakdown: [PaymentBreakdownSchema],
  numberOfAdults: { type: Number, required: true },
  numberOfChildren: { type: Number, required: true },
  numberOfInfants: { type: Number, required: true },
  transactions: [TransactionSchema], // Array to store transaction details
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;