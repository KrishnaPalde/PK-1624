// controllers/feedbackController.js

const Feedback = require("../models/Feedback");

const createFeedback = async (req, res) => {
  try {
    const feedbackData = req.body;

    // Create a new feedback document
    const newFeedback = new Feedback(feedbackData);

    // Save to the database
    await newFeedback.save();

    // Respond with success message
    res.status(201).json({
      message: "Feedback successfully submitted!",
      feedback: newFeedback,
    });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({
      message:
        "An error occurred while submitting your feedback. Please try again.",
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

// controllers/feedbackController.js

const getFeedbacksBelow3Stars = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ overallExperience: { $lt: 3 } });
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

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedbacksBelow3Stars,
  getHotelRating,
  fetchLatestFeedbacks,
  getAllApprovedFeedbacks,
};
