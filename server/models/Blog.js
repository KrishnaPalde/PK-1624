const mongoose = require("mongoose");
const slugify = require("slugify"); // Import slugify to generate slugs

// Schema for Blog Model
const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Blog title
  coverImage: { type: String, required: true }, // URL or path to the cover image
  author: { type: String, required: true }, // Author of the blog
  createdAt: { type: Date, default: Date.now, required: true }, // Blog created on date
  content: { type: String, required: true }, // Main content of the blog
  optionalImages: {
    type: [String], // Array to hold image URLs or paths
    validate: [arrayLimit, "{PATH} exceeds the limit of 5"], // Validator to limit images to 5
  },
  likes: { type: Number, default: 0 }, // Likes count
  featured: { type: Boolean, default: false }, // Is the blog featured or not
  slug: { type: String, unique: true, required: true }, // URL-friendly version of the blog title
  updatedAt: { type: Date, default: Date.now, required: true }, // Date of last update
});

// Validator function to limit the number of images
function arrayLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model("Blog", BlogSchema);
