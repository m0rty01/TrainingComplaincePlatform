const express = require('express');
const TrainingModule = require('../models/TrainingModule');

const router = express.Router();

// Create Training Module
router.post('/', async (req, res) => {
  try {
    const { title, description, duration, complianceRequired } = req.body;
    const newModule = new TrainingModule({ title, description, duration, complianceRequired });
    await newModule.save();
    res.status(201).json({ message: 'Training module created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating training module' });
  }
});

// Get All Training Modules
router.get('/', async (req, res) => {
  try {
    const modules = await TrainingModule.find({}, 'title description duration complianceRequired completionStatus');
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving training modules' });
  }
});

module.exports = router; 