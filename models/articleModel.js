var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Create a Schema for Articles
var ArticleSchema = new Schema({
  title: String,
  summary: String,
  author: String,
  image: String,
  date: String,
  category:String
});

mongoose.model('Article',ArticleSchema);

//Can I use without schema??

module.exports = mongoose.model('Article')