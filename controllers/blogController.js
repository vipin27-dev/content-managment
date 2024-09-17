const Blog = require("../models/blog");
const Category = require("../models/category");

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name") 
      .populate("categories", "name") 
      .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Error fetching blogs" });
  }
};
exports.createBlog = async (req, res) => {
  const { title, content, categories } = req.body;

  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "Author not authenticated" }); 
    }

    const categoryDocs = await Category.find({ name: { $in: categories } });
    const categoryIds = categoryDocs.map((category) => category._id);
    const blog = new Blog({
      title,
      content,
      author: req.user.userId, 
      categories: categoryIds,
    });

    await blog.save();
    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(400).json({ error: error.message || "Error creating blog" });
  }
};


