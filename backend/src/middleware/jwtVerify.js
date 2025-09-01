const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    
    // Attach user details from the token to the request
    req.user = {
      _id: decoded._id,     // You can now use _id or email for lookup
      email: decoded.email,
      role: decoded.role
    };

    next();
  });
};

module.exports = { protect };
