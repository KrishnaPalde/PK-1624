const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentBreakdownSchema = new Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
});

const TransactionSchema = new Schema({
  transactionId: { type: String, required: true },
  orderId: { type: String, required: true, default: "0" },
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

const RoomBookingSchema = new Schema({
  roomId: { type: String, required: true },
  roomName: { type: String, required: true },
  price: { type: Number, required: true },
});

const BookingSchema = new Schema({
  bookingId: { type: String, required: true, unique: true },
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
  rooms: [RoomBookingSchema],
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
  feedbackLink: { type: Boolean, required: true, default: false },
  transactions: [TransactionSchema],
  source: {
    type: String,
    enum: ["website", "airbnb", "makemytrip", "bookings.com", "external"],
    required: true,
    default: "website",
  },
  createdAt: { type: Date, default: Date.now },
  isCustom: { type: Boolean, default: false },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
