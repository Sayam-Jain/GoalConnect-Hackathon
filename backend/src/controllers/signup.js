const bcrypt = require('bcryptjs');
const User = require('../models/User')
const mongoose = require('mongoose')
const { generateAccessToken } = require('../utils/jwtUtiles')

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!password) {
    emptyFields.push('password')
  }
  if (!role) {
    emptyFields.push('role')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashPassword, role: role })
    const token = generateAccessToken(user)
    console.log(token)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      role: user.role, // Send role back to the client
      token: token
    });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


module.exports = { createUser }