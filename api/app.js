var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const {MongoClient} = require('mongodb');
const mongoose = require('mongoose')

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

const uri = "mongodb+srv://henry:henryz@cluster0.ksisl.mongodb.net/webapp?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology:true})

console.log('Connected to Database')

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const message = new mongoose.Schema({
  message: String,
})

const Message = mongoose.model("Messages", message);

usersRouter.post("/", function(req, res){
  console.log("post");
  const Receivedmessage = req.body.message;
  const newMessageDocument = new Message({
    message:Receivedmessage,
  });
  newMessageDocument.save();
});
module.exports = usersRouter;

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
