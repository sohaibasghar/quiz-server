const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  education: { type: String, required: true },
  ethnicity: { type: String, required: true },
  nationality: { type: String, required: true },
  issue: { type: String, required: true },
  religious_affiliation: { type: String, required: true },
  lived_year: { type: Number, required: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;