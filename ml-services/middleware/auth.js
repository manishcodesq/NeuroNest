// ml-services/middleware/auth.js
import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  // Authorization: Bearer tokenString
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g. { id: ... }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
