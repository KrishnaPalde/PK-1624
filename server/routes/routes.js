const express = require("express");
const {
  login,
  sendOTP,
  verifyOTP,
  resetPassword,
  resetPasswordAdmin,
  checkIfUserExists,
  createAdmin,
} = require("../controller/authenticateAdmin");
const {
  checkIfAvailable,
  getRoomDetails,
  getAllRooms,
  getUnavailableDates,
  getUnavailableDatesAdmin,
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
  getAllRoomsStatic,
  createCustomBooking,
  getCitiesByRoom,
  getReportingStats,
} = require("../controller/bookingsController");
const {
  createFeedback,
  getAllFeedbacks,
  fetchLatestFeedbacks,
  getAllApprovedFeedbacks,
  getFeedbacksBelow3Stars,
  getHotelRating,
  sendFeedbackLink,
  approveFeedback,
  deleteFeedback,
  updateRoomRatingAndReviews,
  updateAllRoomReviews,
} = require("../controller/feedbackController");
const {
  BookingConfirmationEmail,
  EnquiryFormEmail,
} = require("../controller/emailController");
const Booking = require("../models/Bookings");
const {
  createCoupon,
  applyCoupon,
  deleteCoupon,
  deactivateCoupon,
  getAllActiveCoupons,
  getAllCoupons,
  updateCoupon,
} = require("../controller/couponController");
const { exportReport } = require("../controller/reportsController");
const Room = require("../models/Room");

const router = express.Router();

router.post("/custom_booking", createCustomBooking);
router.post("/authenticateAdmin", login);
router.get("/check_availability_dates", checkIfAvailable);
router.get("/unavailable_dates", getUnavailableDates);
router.get("/admin/unavailable_dates", getUnavailableDatesAdmin);
router.get("/rooms/:roomId", getRoomDetails);
router.get("/admin/rooms", getAllRooms);
router.get("/allRooms", getAllRoomsStatic);
// router.get("/admin/bookings", fetchBookings6Admin);
router.get("/admin/dashboard_stats", getDashboardStats);
router.post("/admin/export_report", exportReport);
router.get("/admin/reporting_stats", getReportingStats);
router.get("/admin/dashboard_bookings", fetchBookingsAdmin);
router.get("/admin/bookings", getBookings);
router.get("/admin/bookings/:bookingId", getBookingById);
router.get("/admin/bookings/:bookingId/room", getRoomDetailsForm);
router.post("/admin/addroom", addRoom);
router.get("/admin/getroomstatus", updateRoomStatuses);
router.get("/booking-confirmation/:id", BookingConfirmationEmail);
router.post("/contact-us/enquiry", EnquiryFormEmail);
router.post("/check-out/feedback", createFeedback);
router.get("/feedback/send-feedback-link", sendFeedbackLink);
router.get("/feedbacks", getAllFeedbacks);
router.put("/feedbacks/:id/approve", approveFeedback);
router.delete("/feedbacks/:id", deleteFeedback);
router.post("/update-all-room-reviews", updateAllRoomReviews);
router.get("/admin/latest-feedbacks", fetchLatestFeedbacks);
router.get("/admin/feedbacks/below-3-stars", getFeedbacksBelow3Stars);
router.get("/hotel-rating", getHotelRating);
router.get("/update-rating", updateRoomRatingAndReviews);
router.delete("/admin/deleteroom/:id", deleteRoom);
router.get("/public-feedbacks", getAllApprovedFeedbacks);
router.post("/forgot-password/sendOTP", sendOTP);
router.post("/forgot-password/verify-otp", verifyOTP);
router.post("/forgot-password/reset-password", resetPassword);
router.post("/forgot-password/check-user", checkIfUserExists);
router.put("/admin/updateroom/:roomId", updateRoomPrice);
router.get("/admin/get5rooms", get5Rooms);
router.put("/admin/:adminId/reset-password", resetPasswordAdmin);
router.post("/admin/create-admin", createAdmin);
router.post("/admin/offers/create-coupon", createCoupon);
router.post("/offers/apply", applyCoupon);
router.delete("/admin/offers/delete-coupon/:couponCode", deleteCoupon);
router.patch("/admin/offers/deactivate/:couponCode", deactivateCoupon);
router.get("/offers/active", getAllActiveCoupons);
router.get("/offers/all-coupons", getAllCoupons);
router.put("/offers/update-coupon/:id", updateCoupon);
router.get("/cities", getCitiesByRoom);

module.exports = router;
