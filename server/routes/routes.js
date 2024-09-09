const express = require("express");
const {
  login,
  sendOTP,
  resetPassword,
  checkIfUserExists,
  createAdmin,
} = require("../controller/authenticateAdmin");
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
  deleteRoom,
  updateRoomPrice,
  get5Rooms,
} = require("../controller/bookingsController");
const {
  createFeedback,
  getAllFeedbacks,
  fetchLatestFeedbacks,
  getAllApprovedFeedbacks,
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
router.get("/admin/dashboard_bookings", fetchBookingsAdmin);
router.get("/admin/bookings", getBookings);
router.get("/admin/bookings/:bookingId", getBookingById);
router.get("/admin/bookings/:bookingId/room", getRoomDetailsForm);
router.post("/admin/addroom", upload.array("images", 5), addRoom);
router.get("/admin/getroomstatus", updateRoomStatuses);
router.get("/booking-confirmation/:id", BookingConfirmationEmail);
router.post("/contact-us/enquiry", EnquiryFormEmail);
router.post("/check-out/feedback", createFeedback);
router.get("/feedbacks", getAllFeedbacks); 
router.get("/admin/latest-feedbacks", fetchLatestFeedbacks);
router.get("/admin/feedbacks/below-3-stars", getFeedbacksBelow3Stars);
router.get("/hotel-rating", getHotelRating);
router.delete("/admin/deleteroom/:id", deleteRoom);
router.get("/public-feedbacks", getAllApprovedFeedbacks);
router.post("/forgot-password/sendOTP", sendOTP);
// router.post("/forgot-password/reset-password", resetPassword);
router.post("/forgot-password/check-user", checkIfUserExists);
router.put('/admin/updateroom/:roomId',updateRoomPrice);
router.get('/admin/get5rooms',get5Rooms);
router.put('/admin/:adminId/reset-password', resetPassword);
router.post('/admin/create-admin',createAdmin);

module.exports = router;
