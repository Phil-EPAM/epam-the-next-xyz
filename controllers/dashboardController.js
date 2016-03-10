exports.saveArticle =  function (req, res) {
    var article = require('../models/articleModel.js')
    var articleInstance = new article(req.body);
    articleInstance.save(function(err, docs) {
      if (err) {
        return err
      } else {
        console.log("good!!");
      }
      res.redirect('/dashboard');
  })
};

exports.showDashboard = function (req, res) {
  if(req.isAuthenticated()){
    res.locals.scripts.push('/js/dashboard.js');
    res.render('dashboard',{user:req.user});
  }else {
    res.send('please login first')
  }
}