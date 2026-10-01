const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
	console.error(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, HOST, () => {
	console.log(`✅  Server listening on http://${HOST}:${PORT}`);
});

module.exports = app;
