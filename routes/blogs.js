const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, blogController.getAllBlogs);

router.post("/", authMiddleware, blogController.createBlog);


module.exports = router;
