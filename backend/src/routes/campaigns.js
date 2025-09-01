const express = require('express');
const router = express.Router();
const Campaign = require('../models/Campaign');

// POST route to create a new campaign
router.post('/campaigns', async (req, res) => {
    try {
        const { title, logo, description, fundingGoal, currentFunding, customMessage } = req.body;

        const campaign = new Campaign({
            title,
            logo,
            description,
            fundingGoal,
            currentFunding,
            customMessage,
        });

        await campaign.save();
        res.status(201).json({ message: 'Campaign created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create the campaign' });
    }
});

// GET route to fetch all campaigns
router.get('/campaigns', async (req, res) => {
    try {
        const campaigns = await Campaign.find(); // Fetch all campaigns from MongoDB
        res.status(200).json(campaigns); // Send campaigns as JSON response
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
});

module.exports = router;
