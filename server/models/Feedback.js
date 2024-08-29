// models/Feedback.js

const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    overallExperience: { type: Number, min: 0, max: 5, default: 0 },
    roomCleanliness: { type: Number, min: 0, max: 5, default: 0 },
    comfort: { type: Number, min: 0, max: 5, default: 0 },
    amenities: { type: Number, min: 0, max: 5, default: 0 },
    comments: { type: String, default: "" },
    easeOfBooking: { type: Number, min: 0, max: 5, default: 0 },
    websiteUsability: { type: Number, min: 0, max: 5, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);
