const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], default: [] },
  freebies: { type: [String], default: [] },
  weekend: { type: Number },
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Available", "Occupied", "Reserved", "Check-in Today"],
    default: "Available",
  },
  reviews: [reviewSchema],
  totalReviews: { type: Number, default: 0 },
  images: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },

  // 🆕 Added Fields
  isProperty: { type: Boolean, default: false },
  propertyRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    default: null,
  },
});

function arrayLimit(val) {
  return val.length <= 10;
}

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
