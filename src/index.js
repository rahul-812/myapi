const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(express.json());                        // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies

// ── Routes ──────────────────────────────────────────────────────────────────
const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Express server is running (edited v2)!',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server listening on http://localhost:${PORT}`);
});

module.exports = app;
