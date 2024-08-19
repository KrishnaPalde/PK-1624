const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TOCSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ref: { type: String, required: true },
});

const ContentSchema = new mongoose.Schema({
  sectionTitle: { type: String, required: true },
  contentType: {
    type: String,
    enum: ["text", "image", "video", "code"],
    default: "text",
  },
  content: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  coverImage: { type: String }, // URL or path to the cover image
  author: { type: String, required: true }, // Alternatively, you can use ObjectId if referencing a User model
  tags: { type: [String] }, // Array of tags
  published: { type: Boolean, default: false, required: true },
  tableOfContents: [TOCSchema], // Array of Table of Contents sections
  content: [ContentSchema], // Array of content sections (text, images, etc.)
  slug: { type: String, unique: true }, // URL-friendly version of the blog title
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: [CommentSchema], // Array of comments
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date, default: Date.now, required: true },
});

// Middleware to update the `updatedAt` field before saving
BlogSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Blog", BlogSchema);
