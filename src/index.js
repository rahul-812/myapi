const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

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

// Root route
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connection successful",
      timestamp: result.rows[0].now,
    });
  } catch (err) {
    console.error(err.stack);
    res.status(500).json({
      status: "ERROR",
      message: "Database connection failed",
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, HOST, () => {
  console.log(`✅  Server listening on http://${HOST}:${PORT}/test`);
});

module.exports = app;
