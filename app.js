// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// crethe the express app
var app = express();
// connect to MongoDB
mongoose.connect('mongodb://localhost/TheNextCar');

require('./controllers/passportController.js')(app);

// var User = require('./models/User.js');
// var cookieParser = require('cookie-parser');
// var session = require('express-session');
// var flash = require('express-flash');
// var passport = require('passport');

// app.use(cookieParser());
// app.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());


var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         console.log("err occurs")
//         return done(err); }
//       if (!user) {
//         console.log("No Users");
//         return done(null, false, { message: 'Incorrect username.' });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });



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
app.get('/', function(req, res, next) {
    res.locals.scripts.push('/js/home.js');
    // article.find({},null,function(err,docs){
    //   res.render('home',{items: docs});
    // })
    res.render('home');
});

// respond to the get request with the about page
require('./routes/about')(app);
app.use('/articles/:id', function(req, res, next) {
// res.end(req.params.id);
  // var _ = require('underscore');
  // var fs = require('fs');
  // fs.readFile('./data/articles.json', 'utf8', function (err, data) {
  //   if (err) throw err;

  //   data = _.filter(JSON.parse(data), function(item) {
  //     return item.id == req.params.id;
  //   });
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
  // user(req.body);
  userInstance.save(function(err, docs) {
      if (err) {
        return err
      } else {
        console.log("good!!");
      }
      res.redirect('/dashboard');
  })
  // user.create(req.body,function(err, doc){
  //   if(err)
  // })
  // get the data out of the request (req) object
  // store the user in memory here

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

// the api (note that typically you would likely organize things a little differently to this)
app.use('/api', api);

// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});