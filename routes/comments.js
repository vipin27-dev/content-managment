const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/comment', authMiddleware, commentController.createComment);

module.exports = router;