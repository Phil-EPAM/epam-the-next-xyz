var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


module.exports = passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })