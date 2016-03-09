require('../controllers/passport.js')

module.exports = function(app) {
  app.post('/login',passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true }));
};