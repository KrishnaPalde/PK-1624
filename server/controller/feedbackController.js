// controllers/feedbackController.js

const Feedback = require("../models/Feedback");
const Bookings = require("../models/Bookings");
const Room = require('../models/Room');
const { sendFeedbackRequestEmail } = require("../controller/emailController");

const createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;
    feedbackData.approve = feedbackData.overallExperience > 3;

    // Create a new feedback document
    const newFeedback = new Feedback(feedbackData);

    // Save to the database
    await newFeedback.save();

    // Update room rating and total reviews
    await updateRoomRatingAndReviews(feedbackData.room);

    // Respond with success message
    res.status(201).json({
      message: "Feedback successfully submitted!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      message: "An error occurred while submitting your feedback. Please try again.",
      error: error.message,
    });
  }
};

const fetchLatestFeedbacks = async (req, res) => {
  try {
    // Fetch the latest 4 feedbacks where overallExperience is greater than 3
    const feedbacks = await Feedback.find({ overallExperience: { $gt: 3 } })
      .sort({ createdAt: -1 }) // Sort by creation date in descending order
      .limit(4); // Limit to the latest 4 feedbacks

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({
      message: "An error occurred while fetching feedbacks. Please try again.",
      error: error.message,
    });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({
      message: "An error occurred while fetching feedbacks. Please try again.",
      error: error.message,
    });
  }
};

const getAllApprovedFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ approve: true });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({
      message: "An error occurred while fetching feedbacks. Please try again.",
      error: error.message,
    });
  }
};

const approveFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFeedback = await Feedback.findByIdAndUpdate(id, { approve: true }, { new: true });
    
    if (!updatedFeedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }
    
    const updatedRoom = await updateRoomRatingAndReviews(updatedFeedback.room);
    
    if (!updatedRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    
    res.status(200).json({
      message: "Feedback approved and room rating updated",
      feedback: updatedFeedback,
      room: {
        id: updatedRoom._id,
        rating: updatedRoom.rating,
        totalReviews: updatedRoom.totalReviews
      }
    });
  } catch (error) {
    console.error("Error approving feedback:", error);
    res.status(500).json({ message: "An error occurred while approving the feedback." });
  }
};

const updateRoomRatingAndReviews = async (roomId) => {
  try {
    const allFeedbacks = await Feedback.find({ room: roomId });
    const approvedFeedbacks = allFeedbacks.filter(feedback => feedback.approve);

    const totalReviews = allFeedbacks.length;

    let averageRating = 0;
    if (approvedFeedbacks.length > 0) {
      const totalRating = approvedFeedbacks.reduce((sum, feedback) => {
        return sum + (
          feedback.overallExperience +
          feedback.roomCleanliness +
          feedback.comfort +
          feedback.amenities
        ) / 4;
      }, 0);

      averageRating = totalRating / approvedFeedbacks.length;
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId, 
      { 
        rating: averageRating,
        totalReviews: totalReviews
      }, 
      { new: true }
    );

    return updatedRoom;
  } catch (error) {
    console.error("Error updating room rating and reviews:", error);
    throw error;
  }
};

const updateAllRoomReviews = async (req, res) => {
  try {
    const rooms = await Room.find();
    
    for (const room of rooms) {
      await updateRoomRatingAndReviews(room._id);
    }

    res.status(200).json({ message: "All room reviews have been updated successfully." });
  } catch (error) {
    console.error("Error updating all room reviews:", error);
    res.status(500).json({ 
      message: "An error occurred while updating all room reviews.",
      error: error.message
    });
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReview = await Feedback.findByIdAndDelete(id);
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    const updatedRoom = await updateRoomRatingAndReviews(deletedReview.room);
    res.status(200).json({ 
      message: "Feedback successfully deleted",
      room: {
        id: updatedRoom._id,
        rating: updatedRoom.rating,
        totalReviews: updatedRoom.totalReviews
      }
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "An error occurred while deleting the review." });
  }
};

// controllers/feedbackController.js

const getFeedbacksBelow3Stars = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({$and:[{ overallExperience: { $lt: 3 } }, {approve: false}]});
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks below 3 stars:", error);
    res.status(500).json({
      message: "An error occurred while fetching feedbacks. Please try again.",
      error: error.message,
    });
  }
};

// controllers/feedbackController.js

const getHotelRating = async (req, res) => {
  try {
    // Count the number of feedback entries
    const feedbackCount = await Feedback.countDocuments();

    // Check if there are at least 5 feedback entries
    if (feedbackCount < 5) {
      return res.status(400).json({
        message: "Not enough feedback entries to calculate the hotel rating.",
        status: -1,
      });
    }

    // Calculate average ratings
    const ratings = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          averageOverallExperience: { $avg: "$overallExperience" },
          averageRoomCleanliness: { $avg: "$roomCleanliness" },
          averageComfort: { $avg: "$comfort" },
          averageAmenities: { $avg: "$amenities" },
          averageEaseOfBooking: { $avg: "$easeOfBooking" },
          averageWebsiteUsability: { $avg: "$websiteUsability" },
        },
      },
    ]);

    // Respond with average ratings
    res.status(200).json({
      averageRatings: ratings[0] || {},
    });
  } catch (error) {
    console.error("Error calculating hotel rating:", error);
    res.status(500).json({
      message:
        "An error occurred while calculating the hotel rating. Please try again.",
      error: error.message,
    });
  }
};

const sendFeedbackLink = async (req, res) => {
  try {
    console.log("In feedback controller");
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const checkOutTodayBookings = await Bookings.find({
      checkOutDate: { $gte: startOfDay, $lte: endOfDay },
      feedbackLink: false,
    });

    checkOutTodayBookings.forEach(async (booking) => {
      console.log(booking);
      await sendFeedbackRequestEmail(
        booking.email,
        booking.firstName + " " + booking.lastName,
        booking.checkOutDate
      );
      booking.feedbackLink = true;
      await booking.save();
    });

    res.status(200).send({ message: "E-mail Sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};



module.exports = {
  sendFeedbackLink,
  createFeedback,
  getAllFeedbacks,
  getFeedbacksBelow3Stars,
  getHotelRating,
  fetchLatestFeedbacks,
  getAllApprovedFeedbacks,
  approveFeedback,
  deleteFeedback,
  updateRoomRatingAndReviews,
  updateAllRoomReviews,
};
