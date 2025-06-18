const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// POST /api/orders - Place an order
router.post('/', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  let decoded;
  try {
    decoded = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const { items, total, payment_mode } = req.body;
  if (!items || items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  const generatedToken = 'T' + Math.floor(1000 + Math.random() * 9000);
  const now = new Date();
  const orderData = JSON.stringify(items);

  db.query(
    'INSERT INTO orders (user_id, items, total, payment_mode, token, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [decoded.id, orderData, total, payment_mode, generatedToken, now],
    (err) => {
      if (err) return res.status(500).json({ message: 'Database error', error: err });
      res.json({ token: generatedToken, payment_mode, items, total, created_at: now });
    }
  );
});

// GET /api/orders/all - Admin view
router.get('/all', (req, res) => {
  db.query('SELECT * FROM orders ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching orders', error: err });
    res.json(results);
  });
});

// GET /api/orders/user - User’s order history
router.get('/user', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized: No token' });

  let decoded;
  try {
    decoded = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  db.query(
    'SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC',
    [decoded.id],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Error fetching user orders', error: err });
      res.json(results);
    }
  );
});

module.exports = router;
