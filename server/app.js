var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const MongoClient = require('mongodb').MongoClient


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//mongodb:pass: followyourdreams
//mongodb+srv://tom:<password>@cluster0.eaelm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
//Replace <password> with the password for the tom user. Replace 
//myFirstDatabase with the name of the database that connections will use by default.
// Ensure any option params are URL encoded.
var app = express();
var dbConnection = "mongodb+srv://tom:followyourdreams@cluster0.eaelm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

MongoClient.connect(dbConnection, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
  })
  .catch(error => console.error(error))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
