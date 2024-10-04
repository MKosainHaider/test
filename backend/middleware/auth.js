//auth task 2
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send({ error: 'Please authenticate' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded._id);
    if (!user) return res.status(401).send({ error: 'Invalid token' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Invalid token' });
  }
};

const roleCheck = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) return res.status(403).send({ error: 'Forbidden' });
    next();
  };
};

module.exports = { authenticate, roleCheck };