const Blog = require("../models/Blog");

exports.createBlog = async (req, res) => {
  try {
    const {
      title,
      coverImage,
      author,
      createdAt,
      content,
      optionalImages,
      likes,
      featured,
      updatedAt,
      slug,
    } = req.body;

    // Validate that the required fields are present
    if (!title || !coverImage || !author || !content) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // Create a new blog entry
    const newBlog = new Blog({
      title,
      coverImage,
      author,
      createdAt: createdAt || Date.now(), // Use provided date or default to now
      content,
      optionalImages,
      likes: likes || 0, // Default likes to 0 if not provided
      featured: featured || false, // Default featured to false if not provided
      updatedAt: updatedAt || Date.now(), // Use provided date or default to now
      slug: slug || slugify(title, { lower: true, strict: true }), // Generate slug if not provided
    });

    // Save the blog to the database
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
    const { title, coverImage, content, optionalImages, featured } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        coverImage,
        content,
        optionalImages,
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
    const blogs = await Blog.find({}); // Fetch all blogs
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch a single published blog post by ID (Public)
exports.getBlogByIdPublic = async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id }); // Find by ID
    if (!blog) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
