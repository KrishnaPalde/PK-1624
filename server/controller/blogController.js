const Blog = require("../models/Blog");

// Create a new blog post
exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      coverImage,
      author,
      tags,
      published,
      tableOfContents,
      content,
      slug,
      featured,
    } = req.body;
    const newBlog = new Blog({
      title,
      coverImage,
      author,
      tags,
      published,
      tableOfContents,
      content,
      slug,
      featured,
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Fetch all blog posts (Admin)
exports.getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single blog post by ID (Admin)
exports.getBlogByIdAdmin = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post by ID
exports.updateBlog = async (req, res) => {
  try {
    const {
      title,
      coverImage,
      tags,
      published,
      tableOfContents,
      content,
      slug,
      featured,
    } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        coverImage,
        tags,
        published,
        tableOfContents,
        content,
        slug,
        featured,
      },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a blog post by ID
exports.deleteBlog = async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all published blog posts (Public)
exports.getAllPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single published blog post by ID (Public)
exports.getBlogByIdPublic = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id, published: true });
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
