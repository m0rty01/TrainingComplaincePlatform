const express = require('express');
const Progress = require('../models/Progress');

const router = express.Router();

// Track Progress
router.post('/', async (req, res) => {
  try {
    const { eventType, timestamp, details } = req.body;
    const newProgress = new Progress({ eventType, timestamp, details });
    await newProgress.save();
    res.status(201).json({ message: 'Progress tracked successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error tracking progress' });
  }
});

module.exports = router; 