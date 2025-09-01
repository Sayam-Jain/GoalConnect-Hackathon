const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    thumbnail: { type: String }, // URL or base64 string for the image
    createdAt: { type: Date, default: Date.now },
});

const News = mongoose.model('News', newsSchema);

module.exports = News;
