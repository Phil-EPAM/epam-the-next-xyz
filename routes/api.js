var express = require('express');
var router = express.Router();
var _ = require('underscore');
// var mongoose = require('mongoose');
// var Article = mongoose.model('Article')
var Article = require('../models/articleModel.js')
router.get('/articles', function(req, res, next) {
	// var fs = require('fs');
	// var obj;
	// fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	//   if (err) throw err;
	//   res.json(JSON.parse(data));
	// });
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-With')
	Article.find({},null,{sort:{date:-1}}, function(err, data) {
		res.json(data);
	})
});

router.get('/articles/:id', function(req, res, next) {

	// var fs = require('fs');
	// var obj;
	// fs.readFile('./data/articles.json', 'utf8', function (err, data) {
	// 	if (err) throw err;

	// 	data = _.filter(JSON.parse(data), function(item) {
	// 	    return item.id == req.params.id;
	// 	});

	// 	res.json(data);
	// });
	Article.find({_id:req.params.id},null,{sort:{date:-1}}, function(err, data) {
		res.json(data);
	})
});

router.get('/categories',function(req, res, next) {
	Article.find({},{category:1}, function(err, data) {
		res.send(data);
	})
})

module.exports = router;