const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const passport     = require('passport');
const mongoose     = require('mongoose');
const session      = require('express-session');
const socket_io    = require('socket.io');

const config = require('./config/database');

const app    = express();

let io = socket_io();
app.io = io;

io.on( "connection", function( socket ) {
  console.log( "A user connected" );
});


mongoose.connect(config.database, {
  useMongoClient: true,
});

// mongoose.Promise = global.Promise; // for Deprecation Warning

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
require('./config/passport')(passport)
app.use(passport.initialize());
app.use(passport.session());
/*
* Socket setup
*/ 

app.get('/*', (req, res, next) => {
  res.locals.user = req.user || null;
  console.log(res.locals.user);
  next();
});

const index  = require('./routes/index')(io);
const goals  = require('./routes/goals')(io);
app.use('/', index);
app.use('/goals', goals);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
