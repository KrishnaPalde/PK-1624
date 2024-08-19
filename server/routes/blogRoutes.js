// src/routes/blogRoutes.js
const express = require("express");
const router = express.Router();
const blogController = require("../controller/blogController");

// Admin routes
router.post("/admin/blogs", blogController.createBlog);
router.get("/admin/blogs", blogController.getAllBlogsAdmin);
router.get("/admin/blogs/:id", blogController.getBlogByIdAdmin);
router.put("/admin/blogs/:id", blogController.updateBlog);
router.delete("/admin/blogs/:id", blogController.deleteBlog);

// Public routes
router.get("/blogs", blogController.getAllPublishedBlogs);
router.get("/blogs/:id", blogController.getBlogByIdPublic);

module.exports = router;
