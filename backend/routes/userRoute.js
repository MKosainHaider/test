//userRoutes task 2
const express = require('express');
const router = express.Router();
const { authenticate, roleCheck } = require('../middleware/auth');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send({ error: 'Invalid credentials' });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).send({ error: 'Invalid credentials' });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.send({ token });
});

router.get('/products', authenticate, async (req, res) => {
  // Return a list of products
});

router.delete('/products/:id', authenticate, roleCheck('admin'), async (req, res) => {
  // Delete a product
});

router.patch('/products/:id', authenticate, roleCheck('admin'), async (req, res) => {
  // Update a product's stock quantity
});

module.exports = router;