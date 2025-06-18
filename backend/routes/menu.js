const express = require('express');
const db = require('../db');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`)
});
const upload = multer({ storage });

// Serve: GET /api/menu
router.get('/', (req, res) => {
  db.query('SELECT * FROM menu', (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error', details: err });
    res.json(results);
  });
});

// Create: POST /api/menu (with image)
router.post('/', upload.single('image'), (req, res) => {
  const { name, description, price } = req.body;
  const image_url = req.file ? `uploads/${req.file.filename}` : null;

  if (!name || !price || !image_url) {
    return res.status(400).json({ error: 'Name, price, and image are required' });
  }

  db.query(
    'INSERT INTO menu (name, description, price, image_url) VALUES (?, ?, ?, ?)',
    [name, description, price, image_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to add item', details: err });
      res.status(201).json({ message: 'Item added successfully', itemId: result.insertId });
    }
  );
});

// Delete: DELETE /api/menu/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM menu WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete item', details: err });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  });
});

module.exports = router;
