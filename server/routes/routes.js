const express = require("express");
const { login } = require("../controller/authenticateAdmin");
const {
  checkIfAvailable,
  getRoomDetails,
  getAllRooms,
} = require("../controller/bookingsController");
const Booking = require("../models/Bookings");

const router = express.Router();

router.post("/authenticateAdmin", login);
router.get("/check_availability_dates", checkIfAvailable);
router.get("/rooms/:roomId", getRoomDetails);
router.get("/rooms", getAllRooms);

module.exports = router;
