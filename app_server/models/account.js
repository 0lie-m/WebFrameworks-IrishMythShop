const mongoose = require('mongoose');

let passportLocalMongoose = require('passport-local-mongoose');
if (typeof passportLocalMongoose !== 'function' && passportLocalMongoose.default) {
  passportLocalMongoose = passportLocalMongoose.default;
}

const accountSchema = new mongoose.Schema({
  username: String,
  password: String
});

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', accountSchema);
