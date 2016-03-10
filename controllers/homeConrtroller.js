exports.renderHomepage = function(req, res, next) {
  if(req.isAuthenticated()){
    res.locals.scripts.push('/js/home.js');
    res.render('home',{user:req.user});
  } else {
    res.locals.scripts.push('/js/home.js');
    res.render('home');
  }
}
