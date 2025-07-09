// server/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 🔐 Secret key for JWT (can move to .env)
const SECRET_KEY = process.env.JWT_SECRET || 'dev_secret';

// 🚧 Temporary in-memory user store (replace with DB later)
const users = [];

// 🏠 Base route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// ✅ Register route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // check for existing user
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // hash password and store user
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), email, passwordHash };
  users.push(newUser);

  res.status(201).json({ message: 'User registered successfully' });
});

// ✅ Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '1h',
  });

  res.json({ token });
});

// 🚀 Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});