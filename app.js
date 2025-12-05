// Load DB connection
const { usersConn } = require('./app_api/models/db');
const User = usersConn.model('User');

const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const apiRoutes = require('./app_api/routes/index');
var indexRouter = require('./app_server/routes/index');

// Init app
var app = express();

// View setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Static folders
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_public')));

// Sessions
app.use(
  session({
    secret: 'irish-myth-shop-secret',
    resave: false,
    saveUninitialized: false
  })
);

app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash + user locals
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  next();
});

// CORS for Angular
app.use('/api', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/api', apiRoutes);

// 404 handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
