var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  email: { type: String, required: true},
  password: { type: String, required: true}
});

UserSchema.method('validPassword', function(password, callback) {
  if (password === this.password) {
    return true;
  } else {
    return false;
  }
});

mongoose.model('User',UserSchema);
module.exports = mongoose.model('User');