const express = require('express');
const router = express.Router();

// GET /api/health
router.get('/health', (req, res) => {
  res.json({ status: 'OK', uptime: process.uptime() });
});

// GET /api/users  (example resource)
router.get('/users', (req, res) => {
  res.json([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ]);
});

// POST /api/users  (example resource)
router.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  res.status(201).json({ id: Date.now(), name });
});

module.exports = router;
