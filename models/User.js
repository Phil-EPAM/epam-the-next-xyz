var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  username: String,
  email: { type: String, required: true},
  password: { type: String },
  salt: { type: String }
});

// UserSchema.method('validPassword', function(password, callback) {
//   if (password === this.password) {
//     return true;
//   } else {
//     return false;
//   }
// });
UserSchema.pre('save', function(next) {
 if (this.password) {
   this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
   this.password = this.hashPassword(this.password);
 }
 next();
});

// Create an instance method for hashing a password
UserSchema.methods.hashPassword = function(password) {
   return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
 };

 // Create an instance method for authenticating user
 UserSchema.methods.validPassword = function(password) {
  console.log('validating password in User.js Model');
   return this.password === this.hashPassword(password);
 };

mongoose.model('User',UserSchema);
module.exports = mongoose.model('User');