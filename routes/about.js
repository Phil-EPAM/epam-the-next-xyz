var article = require('../controllers/aboutController.js')


module.exports = function(app) {
  app.get('/about',article)
}