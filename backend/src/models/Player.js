const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    playerNumber: { type: String },
    position: { type: String },
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true }, // Reference to Club
    stats: {
        matchesPlayed: { type: Number, default: 0 },
        saves: { type: Number, default: 0 },
        cleanSheets: { type: Number, default: 0 },
        tackles: { type: Number, default: 0 },
        assists: { type: Number, default: 0 },
    },
    profileLink: { type: String },
    imageUrl: { type: String },
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
