const mongoose = require('mongoose');

// Define a schema for each season's statistics
const seasonStatSchema = new mongoose.Schema({
    year: Number,
    matches: Number,
    minutes: Number,
    goals: Number,
    assists: Number,
    saves: Number,
    clean_sheets: Number,
    yellow_cards: Number,
    red_cards: Number,
    passing_accuracy: Number,
    tackles_won: Number,
    aerial_duel_won: Number,
    fouls_committed: Number,
    interceptions: Number,
    clearances: Number,
    goals_conceded: Number,
    shots_faced: Number,
    avg_saves_per_game: Number,
}, { _id: false });

// Define the main player statistics schema
const playerStatsSchema = new mongoose.Schema({
    player_id: { type: Number, unique: true },
    full_name: String,
    position: String,
    nationality: String,
    current_team_name: String,
    height: Number,
    weight: Number,
    date_of_birth: String,
    seasonStats: [seasonStatSchema] // Array of season statistics
}, { timestamps: true });

module.exports = mongoose.model('PlayerStats', playerStatsSchema);
