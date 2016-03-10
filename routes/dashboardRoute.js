var dashboardController = require('../controllers/dashboardController.js');



module.exports = function(app) {
  app.post('/dashboard',dashboardController.saveArticle);
  app.get('/dashboard',dashboardController.showDashboard)
}