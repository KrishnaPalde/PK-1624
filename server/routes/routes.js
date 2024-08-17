const express = require("express");
const { login } = require("../controller/authenticateAdmin");
const {
  checkIfAvailable,
  getRoomDetails,
  getAllRooms,
  getUnavailableDates
} = require("../controller/bookingsController");
const Booking = require("../models/Bookings");

const router = express.Router();

router.post("/authenticateAdmin", login);
router.get("/check_availability_dates", checkIfAvailable);
router.get("/unavailable_dates", getUnavailableDates);
router.get("/rooms/:roomId", getRoomDetails);
router.get("/rooms", getAllRooms);

module.exports = router;
