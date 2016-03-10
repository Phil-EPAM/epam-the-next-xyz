var article = require('../models/articleModel.js');

var categories = function(req, res) {
  console.log('about page isAuthenticated')
  if (req.isAuthenticated()){
    article.find({},{category:1}, function(err, data) {
      res.render("about", {categories: data, user: req.user});
    });
  } else {
      res.render("about")
  }
};
module.exports = categories;