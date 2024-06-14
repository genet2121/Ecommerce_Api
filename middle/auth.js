const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateJWT;
