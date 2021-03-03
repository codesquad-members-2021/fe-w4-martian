var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
<<<<<<< HEAD
<<<<<<< HEAD
app.engine('html', require('ejs').renderFile);
=======
>>>>>>> 06a80f4 (개발환경 구성 커밋)
=======
app.engine('html', require('ejs').renderFile);
>>>>>>> aaa509b (view ejs 엔진을 사용하지 않고 html로 렌더)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
<<<<<<< HEAD
<<<<<<< HEAD
  res.render('error.html');
=======
  res.render('error');
>>>>>>> 06a80f4 (개발환경 구성 커밋)
=======
  res.render('error.html');
>>>>>>> aaa509b (view ejs 엔진을 사용하지 않고 html로 렌더)
});

module.exports = app;
