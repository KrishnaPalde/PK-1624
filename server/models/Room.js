const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

const roomSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Custom ID field
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  amenities: { type: [String], default: [] }, 
  freebies: {type: [String], default:[]},
  weekend: {type: Number},
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Available', 'Booked', 'Reserved', 'Waitlist', 'Blocked'],
    default: 'Available'
  },
  reviews: [reviewSchema],
  images: {
    type: [String],
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"],
  },
});

function arrayLimit(val) {
  return val.length <= 5;
}

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
