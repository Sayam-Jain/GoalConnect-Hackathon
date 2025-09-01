const express = require('express');
const multer = require('multer');
const path = require('path');
const News = require('../models/News');

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Set the directory for uploads
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Set a unique filename
    }
});

const upload = multer({ storage });

// POST route to create a news item
router.post('/news', upload.single('thumbnail'), async (req, res) => {
    try {
        const { title, content } = req.body;

        // Create new news item
        const newsItem = new News({
            title,
            content,
            thumbnail: req.file ? `/uploads/${req.file.filename}` : null // Save image path if uploaded
        });

        await newsItem.save();
        res.status(201).json({ message: 'News item created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create news item' });
    }
});
// GET route to fetch all news items
router.get('/news', async (req, res) => {
    try {
        const newsItems = await News.find();
        res.status(200).json(newsItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch news items' });
    }
});


module.exports = router;
