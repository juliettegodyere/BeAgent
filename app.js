var express = require('express');
var http = require('http');
var path = require('path');
var router = express.Router();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({dest:'public/photos/'});
var session = require('express-session');

// var photos = multer({dest:'/public/photos/'});

//middleware
var user = require('./models/middleware/user');
var messages = require('./models/messages');

//routes
// var routes = require('./routes');
var photos = require('./routes/photos');
var register = require('./routes/register');
var login = require('./routes/login');
var about = require('./routes/about');
var contact = require('./routes/contact');


// var search = require('./routes/search');



var app = express();

// view engine setup
app.set('port',process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'public/photos')));

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:process.env.SESSION_SECRET||'secret',
  resave:false,
  saveUninitialized:false
}));
app.use(user);
app.use(messages);
app.use(router);

// app.set('photos', __dirname + '/public/photos');


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// app.configure('development',function(){
//   app.use(express.errorHandler());
// });
var type = upload.single('thumbnail');
app.get('/',photos.list);
app.get('/upload',photos.form);
app.post('/upload', type,photos.submit);
app.get('/register', register.form);
app.post('/register', register.submit);
app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/about', about.form);
app.get('/logout',login.logout);
app.get('/contact',contact.form);
app.post('/',photos.searchSubmit);
// app.use('/', routes.index);


http.createServer(app).listen(app.get('port'),function(){
  console.log("express server listening on port " + app.get('port'));
});


module.exports = app;
