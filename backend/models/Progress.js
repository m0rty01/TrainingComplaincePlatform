const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  eventType: { type: String, required: true },
  timestamp: { type: Date, required: true },
  details: { type: mongoose.Schema.Types.Mixed },
});

module.exports = mongoose.model('Progress', progressSchema); 