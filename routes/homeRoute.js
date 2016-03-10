var homeController = require('../controllers/homeConrtroller.js')


module.exports = function(app) {
  app.get('/',homeController.renderHomepage)
}