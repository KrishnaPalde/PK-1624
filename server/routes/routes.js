const express = require("express");
const { login } = require("../controller/authenticateAdmin");
const {
  checkIfAvailable,
  getRoomDetails,
} = require("../controller/bookingsController");
const Booking = require("../models/Bookings");

const router = express.Router();

router.post("/authenticateAdmin", login);
router.get("/check_availability_dates", checkIfAvailable);
router.get("/rooms/:roomId", getRoomDetails);

module.exports = router;
