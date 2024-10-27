const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  discountValue: { type: Number, required: true },
  type: {
    type: String,
    enum: [
      "Advance Booking",
      "Minimum Booking Amount",
      "Length of Stay",
      "Seasonal Promotion",
      "Room Type",
      "Fixed Amount",
    ],
    required: true,
  },
  conditions: {
    advanceBookingDays: { type: Number, default: null }, // Advance Booking
    minBookingAmount: { type: Number, default: null }, // Minimum Booking Amount
    minLengthOfStay: { type: Number, default: null }, // Length of Stay
    seasonStartDate: { type: Date, default: null }, // Seasonal Promotion
    seasonEndDate: { type: Date, default: null },
    applicableRoomTypes: [{ type: String, default: [] }], // Room Type
  },
  expirationDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  image: {type: String},
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
