const express = require('express'); 
const Post = require('../models/Post');
const socketIo = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app); // Create HTTP server with the Express app

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Allow your frontend origin
        methods: ["GET", "POST"], // Allow specific methods
        allowedHeaders: ["Content-Type"], // Allow specific headers
        credentials: true // Allow credentials (cookies, etc.)
    }
});

// Socket.IO connection handler
io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

// Define your routes after setting up the server and Socket.IO
const router = express.Router();

router.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

// API endpoint to create a new post
router.post("/posts", async (req, res) => {
    const newPost = new Post({ content: req.body.content });
    await newPost.save();
    io.emit("newPost", newPost); // Emit new post event
    res.json(newPost);
});

// API endpoint to reply to a post
router.post("/posts/:id/reply", async (req, res) => {
    const post = await Post.findById(req.params.id);

    const newReply = { content: req.body.content, createdAt: new Date() };
    post.replies.push(newReply);
    await post.save();

    io.emit("newReply", post); // Emit the updated post with new reply
    res.json(post);
});

// Route to delete a specific post by ID
router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).send('Post not found');
        }
        io.emit("deletedPost", id); // Emit event for post deletion
        res.status(200).send(deletedPost);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.use("/api", router); // Mount the router

// Start the server
server.listen(4000, () => {
    console.log("Server is running on port 4000");
});

module.exports = server;
module.exports = router;