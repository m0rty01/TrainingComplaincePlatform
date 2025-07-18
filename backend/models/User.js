const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  complianceStatus: { type: String, default: 'incomplete' },
});

module.exports = mongoose.model('User', userSchema); 