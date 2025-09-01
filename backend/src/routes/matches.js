const express = require('express');
const router = express.Router();
const Fixture = require('../models/Fixture')

router.get('/fixtures', async (req, res) => {
    try {
        const fixtures = await Fixture.find();
        res.json(fixtures);
    } catch (err) {
        console.error('Error fetching fixtures:', err);
        res.status(500).json({ success: false, message: 'Failed to fetch fixtures from database' });
    }
});


module.exports = router;
