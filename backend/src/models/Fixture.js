const mongoose = require('mongoose');

const FixtureSchema = new mongoose.Schema({
    date: String,
    day: String,
    month: String,
    tournamentName: String,
    venue: String,
    time: String,
    team1Name: String,
    team2Name: String,
    team1Score: String,
    team2Score: String,
    team1Logo: String,
    team2Logo: String,
    status: {
      type: String,
      enum: ["live","upcoming","past"]
    }
  });
const Fixture = mongoose.model('Matches', FixtureSchema);

module.exports = Fixture;
