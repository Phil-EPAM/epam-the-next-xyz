// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
// crethe the express app
var app = express();
// connect to MongoDB
mongoose.connect('mongodb://localhost/TheNextCar');

require('./controllers/passportController.js')(app);

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var isAuthenticated = function (req,res,next) {
    if (req.isAuthenticated()){
      console.log('hey I am authenticated')
    } return next();
    ;
}
// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});


var api = require('./routes/api');
var about = require('./routes/about.js');


// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));



//add local scripts
app.use(function (req, res, next) {
  res.locals.scripts = [];
 if (req.user) {
  res.locals.user = req.user;
 }
  next();
});

// respond to the get request with the home page
app.get('/',isAuthenticated ,function(req, res, next) {
    console.log('I am authenticated at')
    res.locals.scripts.push('/js/home.js');
    res.render('home');
});

// respond to the get request with the about page
require('./routes/about')(app);

app.use('/articles/:id', function(req, res, next) {

  res.locals.scripts.push('/js/home.js');
  res.render("article",{articleId:req.params.id});
  // });
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

// handle the posted registration data
app.post('/register', function(req, res) {
  var User = require('./models/User.js');
  var userInstance = new User(req.body);
  userInstance.save(function(err, docs) {
      if (err) {
        return err
      } else {
        console.log("good!!");
      }
      res.redirect('/dashboard');
  })
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard', function (req, res) {
    res.locals.scripts.push('/js/dashboard.js');
    console.log(req.user);
    res.render('dashboard');
});

app.post('/dashboard', function (req, res) {
    console.log("I am posting")
    var article = require('./models/articleModel.js')
    var articleInstance = new article(req.body);
    console.log(req.body)
    articleInstance.save(function(err, docs) {
      if (err) {
        return err
      } else {
        console.log("good!!");
      }
      res.redirect('/dashboard');
  })
});

app.get('/login', function(req, res) {
    res.render('login');
  });

app.post('/login',
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});



var isAuthenticated = function (req,res,next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}




// res.end(req.params.id);
  // var _ = require('underscore');
  // var fs = require('fs');
  // fs.readFile('./data/articles.json', 'utf8', function (err, data) {
  //   if (err) throw err;

  //   data = _.filter(JSON.parse(data), function(item) {
  //     return item.id == req.params.id;
  //   });