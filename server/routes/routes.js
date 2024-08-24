const express = require("express");
const { login } = require("../controller/authenticateAdmin");
const {
  checkIfAvailable,
  getRoomDetails,
  getAllRooms,
  getUnavailableDates,
  fetchBookingsAdmin,
  getDashboardStats,
  getBookings,
  getBookingById,
  getRoomDetailsForm,
} = require("../controller/bookingsController");
const Booking = require("../models/Bookings");

const router = express.Router();

router.post("/authenticateAdmin", login);
router.get("/check_availability_dates", checkIfAvailable);
router.get("/unavailable_dates", getUnavailableDates);
router.get("/rooms/:roomId", getRoomDetails);
router.get("/rooms", getAllRooms);
// router.get("/admin/bookings", fetchBookingsAdmin);
router.get("/admin/dashboard_stats", getDashboardStats);
router.get("/admin/bookings",getBookings);
router.get("/admin/bookings/:bookingId",getBookingById);
router.get("/admin/bookings/:bookingId/room",getRoomDetailsForm);

module.exports = router;
