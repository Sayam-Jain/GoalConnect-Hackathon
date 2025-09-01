const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,        // Include _id for efficient lookups
      name: user.name,
      email: user.email,
      role: user.role
    },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: '1d' }     // Token expires in 1 day
  );
}

module.exports = {
  generateAccessToken
}
