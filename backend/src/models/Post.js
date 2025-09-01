const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    replies: [{ content: String, createdAt: { type: Date, default: Date.now } }],
    createdAt: { type: Date, default: Date.now }
  });
  
  const Post = mongoose.model("Post", postSchema);
  
  module.exports = Post;