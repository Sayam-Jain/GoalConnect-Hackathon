const express = require('express');
const { createUser } = require('../controllers/signup.js');
const { loginUser, refresh, logout } = require('../controllers/authControls.js');
const { login } = require('../controllers/login.js');
const { protect } = require("../middleware/jwtVerify.js");
const User = require('../models/User'); 
const router = express.Router();

router.post('/signup', createUser);

router.post('/login', login);

router.post('/logout', logout);

router.get('/protected', protect, async (req, res) => {
    try {
      const user = await User.findOne({ email: req.user.email }); 
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        _id: user._id,      
        name: user.name,
        email: user.email,
        role: user.role,   
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
