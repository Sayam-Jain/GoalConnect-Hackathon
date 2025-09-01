const express = require('express');
const Player = require('../models/Player'); // Assuming you have a Player model
const router = express.Router();

router.get('/players/:clubId', async (req, res) => {
    const { clubId } = req.params; // Extract clubId from query parameters

    try {
        // Fetch players associated with the given clubId
        const players = await Player.find({ club: clubId });

        res.status(200).json({ playerIds: players.map(player => player._id) });
        // Return the players data
        res.status(200).json({ players });
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ message: 'Error fetching players' });
    }
});

module.exports = router;
