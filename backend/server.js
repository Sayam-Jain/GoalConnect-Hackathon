require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const scrapeRoutes = require('./src/routes/scrape');
const razorpayRoutes = require('./src/routes/razorpay');
const Razorpay = require("razorpay");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require("http");
const socketIo = require("socket.io");
const jobPostingRoutes = require('./src/routes/jobposting')
const campaignRoutes = require('./src/routes/campaigns');
const newsRoutes = require('./src/routes/news');
const app = express();
const server = http.createServer(app);
const playerRoutes = require('./src/routes/player')
const matcheRoutes = require('./src/routes/matches');
/*const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"], 
    allowedHeaders: ["Content-Type"], 
    credentials: true 
  }
});
*/
// middleware
app.use(express.json());
const allowedOrigins = [
  "http://localhost:3000", // for local dev
  "https://goal-connect-nu.vercel.app", // production domain
  "https://goal-connect-hfxvk4ayz-madscientistt4s-projects.vercel.app", // preview deployments
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use('/auth', authRoutes);
app.use('/scrape', scrapeRoutes);
app.use('/razorpay', razorpayRoutes);
app.use('/apis', jobPostingRoutes);
app.use('/apis', campaignRoutes);
app.use('/apis', newsRoutes);
app.use('/apis', playerRoutes);
app.use('/apis/matches', matcheRoutes);


// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong." });
  }
});

const postSchema = new mongoose.Schema({
  content: String,
  username: String, 
  replies: [{ 
    content: String, 
    username: String, 
    createdAt: { type: Date, default: Date.now } 
  }],
  createdAt: { type: Date, default: Date.now }
});

/*const Post = mongoose.model("Post", postSchema);

app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const { content, username } = req.body; 
  const newPost = new Post({ content, username }); 
  await newPost.save();
  io.emit("newPost", newPost); 
  res.json(newPost);
});

app.post("/api/posts/:id/reply", async (req, res) => {
  const { content, username } = req.body; 
  const post = await Post.findById(req.params.id);

  const newReply = { content, username, createdAt: new Date() }; 
  post.replies.push(newReply);
  await post.save();

  io.emit("newReply", post); 
  res.json(post);
});

app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).send('Post not found');
    }
    io.emit("deletedPost", id); 
    res.status(200).send(deletedPost);
  } catch (error) {
    res.status(500).send('Server error');
  }
});*/

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('connected to database');
    server.listen(process.env.PORT, () => {
      console.log('listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/*io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});*/