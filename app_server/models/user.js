const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName:     { type: String, required: true, trim: true },
  email:        { type: String, required: true, lowercase: true, trim: true, unique: true },
  phone:        { type: String, default: '' },
  addressLine1: { type: String, default: '' },
  addressLine2: { type: String, default: '' },
  city:         { type: String, default: '' },
  county:       { type: String, default: '' },
  eircode:      { type: String, default: '' },
  password:     { type: String, required: true },
  createdAt:    { type: Date, default: Date.now }
}, { collection: 'User' });

module.exports = function(conn) {
  return conn.models.User || conn.model('User', userSchema, 'User');
};
