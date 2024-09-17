require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth'); 
const userRoutes = require('./routes/users'); 
const blogRoutes = require('./routes/blogs'); 
const commentRoutes = require('./routes/comments'); 
const categoryRoutes = require('./routes/categories');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/blogs', blogRoutes); 
app.use('/api/comments', commentRoutes); 


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});
app.get('/blogdetail', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blogdetail.html'));
});
app.get('/editprofile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'editprofile.html'));
});
app.get('/blog/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'blogDetails.html'));
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectDB();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
