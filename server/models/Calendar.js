const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  eventId: { type: String, unique: true },
  roomType: { type: String, required: true },
  date: { type: Date, required: true },
  source: {
    type: String,
    enum: ["website", "airbnb", "makemytrip", "bookings.com", "external"],
    default: "website",
  }, // Event source
  status: { type: String, enum: ["booked", "available"], default: "booked" }, // Availability status
});

module.exports = mongoose.model("Calendar", CalendarSchema);
