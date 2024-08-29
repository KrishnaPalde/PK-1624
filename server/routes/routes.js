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
  addRoom,
  updateRoomStatuses,
} = require("../controller/bookingsController");
const {
  createFeedback,
  getAllFeedbacks,
  getFeedbacksBelow3Stars,
  getHotelRating,
} = require("../controller/feedbackController");
const {
  BookingConfirmationEmail,
  EnquiryFormEmail,
} = require("../controller/emailController");
const Booking = require("../models/Bookings");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/authenticateAdmin", login);
router.get("/check_availability_dates", checkIfAvailable);
router.get("/unavailable_dates", getUnavailableDates);
router.get("/rooms/:roomId", getRoomDetails);
router.get("/admin/rooms", getAllRooms);
// router.get("/admin/bookings", fetchBookings6Admin);
router.get("/admin/dashboard_stats", getDashboardStats);
router.get("/admin/bookings", getBookings);
router.get("/admin/bookings/:bookingId", getBookingById);
router.get("/admin/bookings/:bookingId/room", getRoomDetailsForm);
router.post("/admin/addroom", upload.array("images", 5), addRoom);
router.get("/admin/getroomstatus", updateRoomStatuses);
router.get("/booking-confirmation/:id", BookingConfirmationEmail);
router.post("/contact-us/enquiry", EnquiryFormEmail);
router.post("/check-out/feedback", createFeedback);
router.get("/feedbacks", getAllFeedbacks);
router.get("/admin/feedbacks/below-3-stars", getFeedbacksBelow3Stars);
router.get("/hotel-rating", getHotelRating);

module.exports = router;