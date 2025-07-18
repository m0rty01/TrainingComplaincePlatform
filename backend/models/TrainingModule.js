const mongoose = require('mongoose');

const trainingModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: Number, required: true }, // Duration in hours
  complianceRequired: { type: Boolean, default: false },
  completionStatus: { type: String, enum: ['Not Started', 'In Progress', 'Completed'], default: 'Not Started' },
});

module.exports = mongoose.model('TrainingModule', trainingModuleSchema); 