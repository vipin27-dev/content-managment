const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  console.log("Request body:", req.body);  
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    console.log("Error: Missing fields", req.body); 
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Error: User already exists");
      return res.status(400).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("New user created:", newUser); 

    res.status(201).json({ success: true, message: "Signup successful!" });
  } catch (error) {
    console.error("Signup error:", error.message, error.stack);  
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login Request Body:", req.body); 

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Error: User not found");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Error: Passwords do not match");
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    console.log("Login successful, Token generated:", token); 

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
