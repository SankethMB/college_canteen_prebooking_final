const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashed, role], (err) => {
    if (err) return res.status(500).send(err);
    res.send('Registered');
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('Invalid');
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).send('Wrong Password');
    const token = jwt.sign({ id: results[0].id, role: results[0].role }, 'secret');
    res.json({ token, role: results[0].role });
  });
});

module.exports = router;
