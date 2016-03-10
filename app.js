// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var crypto = require('crypto');
var logout = require('express-passport-logout');
// crethe the express app
var app = express();
// connect to MongoDB
mongoose.connect('mongodb://localhost/TheNextCar');
//link to the controller
require('./controllers/passportController.js')(app);
// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');
// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});
//define routes
var api = require('./routes/api');
var about = require('./routes/about.js');
var logout = require('./routes/logout.js');
var passportAuthenticate = require('./routes/login.js');
var homeRoute = require('./routes/homeRoute.js')
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
  next();
});
// include home page route
require('./routes/homeRoute')(app);
// include about page route
require('./routes/about')(app);
require('./routes/dashboardRoute')(app);

app.use('/articles/:id', function(req, res, next) {

  res.locals.scripts.push('/js/home.js');
  var article = require('./models/articleModel.js');
  article.findOne({_id:req.params.id}, function(err, data) {
      res.render("article", {oneArticle: data});
    });
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
      }
      res.render('login');
  })
});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)


app.get('/login', function(req, res) {
    res.render('login');
  });
app.post('/login',passportAuthenticate);
app.get('/logout',logout);
app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);
// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});