const Comment = require("../models/comment");

exports.createComment = async (req, res) => {
  const { content, blogId } = req.body;

  try {
    const comment = new Comment({
      content,
      blog: blogId,
      author: req.user._id,
    });
    await comment.save();
    res.redirect(`/blog/${blogId}`);
  } catch (error) {
    res.status(400).send("Error adding comment");
  }
};
