const mongoose = require('mongoose');

let passportLocalMongoose = require('passport-local-mongoose');
if (typeof passportLocalMongoose !== 'function' && passportLocalMongoose.default) {
  passportLocalMongoose = passportLocalMongoose.default;
}

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  addressLine1: String,
  addressLine2: String,
  city: String,
  county: String,
  eircode: String,
  createdAt: { type: Date, default: Date.now }
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

module.exports = conn => conn.models.User || conn.model('User', userSchema, 'User');
