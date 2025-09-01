const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  logo: { type: String, required: true }, // Base64 string for the logo image
  description: { type: String, required: true },
  fundingGoal: { type: String, required: true },
  currentFunding: { type: String, default: "₹0" }, // Default to ₹0 for a new campaign
  customMessage: { type: String, required: true },
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
