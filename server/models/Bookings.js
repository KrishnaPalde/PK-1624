const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  package: { type: Schema.Types.ObjectId, ref: "Package" },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);

module.exports = Booking;
