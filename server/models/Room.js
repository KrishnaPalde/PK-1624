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
  rating: { type: Number, default: 0 },
  price: { type: Number, required: true },
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
