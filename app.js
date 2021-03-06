var express = require('express');



var mongoose = require('./model/db');
/**
 * call the schemas here so that they get indexed as soon as the app 
 * starts, otherwise it may slow the app mid run stage.
 */
require('./schemas');

require('dotenv').config()

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var winston = require('./shared/logger');

var app = express();

//added compression for faster rendering
app.use(compression());
//morgan logger level
app.use(logger('dev'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));



app.set('view engine', 'pug');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(process.env.cookieSigningSignatureSecret));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./routes'));



// catch 404 and forward to error handler
// need to change this to 404 page
app.use(function(req, res, next) {
  var err = new Error('Not Found');
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
