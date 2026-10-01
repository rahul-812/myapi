const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController')

// POST /api/login
router.post('/login', controller.findOrCreateAccount)

module.exports = router;
