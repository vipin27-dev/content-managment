const User = require("../models/user");
const bcrypt = require('bcrypt');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.render("profile", { user });
  } catch (error) {
    res.status(400).send("Error fetching profile");
  }
};

exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const updates = { name, email };

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updates.password = hashedPassword;
  }

  try {
    await User.findByIdAndUpdate(req.user._id, updates);
    res.status(200).json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error updating profile" });
  }
};

