import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaStar } from "react-icons/fa"; // Import star icon

const StarRating = ({ rating, setRating }) => {
  // State to track the hovered star
  const [hover, setHover] = useState(null);

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              className="cursor-pointer"
              size={30}
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    overallExperience: 0,
    roomCleanliness: 0,
    comfort: 0,
    amenities: 0,
    comments: "",
    easeOfBooking: 0,
    websiteUsability: 0,
  });

  const [formError, setFormError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.email || !formData.overallExperience) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      // await axios.post("http://localhost:4444/api/check-out/feedback", formData);
      await axios.post("https://pk-1624.onrender.com/api/check-out/feedback", formData);
      
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        overallExperience: 0,
        roomCleanliness: 0,
        comfort: 0,
        amenities: 0,
        comments: "",
        easeOfBooking: 0,
        websiteUsability: 0,
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setFormError("An error occurred while submitting your feedback. Please try again.");
    }
  };

  return (
    
    <div>
      <Header />
      <div className="max-w-3xl p-6 mx-auto mt-8 mb-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-bold text-center">Feedback Form</h1>
        {isSubmitted ? (
          <div className="font-semibold text-center text-green-500">
            <p>Thank you for your feedback!</p>
          </div>
          
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name and Email in the First Row */}
            <div className="flex flex-col col-span-1 gap-6 md:col-span-2 md:flex-row">
              <div className="flex-1">
                <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="email" className="block mb-2 font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Overall Experience and Comfort */}
            <div>
              <label htmlFor="overallExperience" className="block mb-2 font-semibold text-gray-700">
                Overall Experience
              </label>
              <StarRating rating={formData.overallExperience} setRating={(value) => handleRatingChange("overallExperience", value)} />
            </div>

            <div>
              <label htmlFor="comfort" className="block mb-2 font-semibold text-gray-700">
                Comfort
              </label>
              <StarRating rating={formData.comfort} setRating={(value) => handleRatingChange("comfort", value)} />
            </div>

            {/* Amenities and Room Cleanliness */}
            <div>
              <label htmlFor="amenities" className="block mb-2 font-semibold text-gray-700">
                Amenities
              </label>
              <StarRating rating={formData.amenities} setRating={(value) => handleRatingChange("amenities", value)} />
            </div>

            <div>
              <label htmlFor="roomCleanliness" className="block mb-2 font-semibold text-gray-700">
                Room Cleanliness
              </label>
              <StarRating rating={formData.roomCleanliness} setRating={(value) => handleRatingChange("roomCleanliness", value)} />
            </div>

            {/* Website Feedback Section */}
            <div className="flex col-span-1 gap-6 mt-4 md:col-span-2">
              {/* Ease of Booking */}
              <div className="flex-1">
                <label htmlFor="easeOfBooking" className="block mb-2 font-semibold text-gray-700">
                  Ease of Booking
                </label>
                <StarRating rating={formData.easeOfBooking} setRating={(value) => handleRatingChange("easeOfBooking", value)} />
              </div>

              {/* Website Usability */}
              <div className="flex-1">
                <label htmlFor="websiteUsability" className="block mb-2 font-semibold text-gray-700">
                  Website Usability
                </label>
                <StarRating rating={formData.websiteUsability} setRating={(value) => handleRatingChange("websiteUsability", value)} />
              </div>
            </div>

              {/* Additional Comments */}
              <div className="col-span-1 md:col-span-2">
              <label htmlFor="comments" className="block mb-2 font-semibold text-gray-700">
                Additional Comments
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              />
            </div>

            {/* Error Message Display */}
            {formError && <p className="col-span-1 font-semibold text-red-500 md:col-span-2">{formError}</p>}

            {/* Submit Button */}
            <div className="col-span-1 md:col-span-2">
              <button
                type="submit"
                className="w-full px-6 py-3 font-bold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        )}
      </div>
      <div>
      { isSubmitted ? (<div><br></br><br></br>
      <br></br><br></br></div>) : (<br></br>)}
      </div>
      
      <Footer />
    </div>
  );
};

export default Feedback;