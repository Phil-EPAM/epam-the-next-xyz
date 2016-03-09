var article = require('../models/articleModel.js');

// article.getCategories = function(returndata) {
//   article.find({},{category:1}, function(err, data) {
//       returndata(data);
//   })
// }

var categories = function(req, res) {
    article.find({},{category:1}, function(err, data) {
      res.render("about", {categories: data});
    });
};
module.exports = categories;