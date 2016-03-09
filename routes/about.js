var article = require('../models/articleModel.js');

article.getCategories = function(returndata) {
  article.find({},{category:1}, function(err, data) {
      returndata(data);
  })
}

module.exports = article;