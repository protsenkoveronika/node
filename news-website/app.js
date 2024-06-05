var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');

var indexRouter = require('./routes/index');
var adminUsersRouter = require('./routes/usersAdmin');
var adminCategoriesRouter = require('./routes/categoriesAdmin');
var adminNewsRouter = require('./routes/newsAdmin');
var newsRouter = require('./routes/news');
var categoriesRouter = require('./routes/categories');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');
var logoutRouter = require('./routes/logout');

var app = express();

// serve static files from the 'public' directory and Bootstrap from the node_modules
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const methodOverride = require('method-override');
// app.use(methodOverride('delete'));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // установите true, если используете HTTPS
}));

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/adminUsers', adminUsersRouter);
app.use('/adminCategories', adminCategoriesRouter);
app.use('/adminNews', adminNewsRouter);
app.use('/news', newsRouter);
app.use('/categories', categoriesRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);



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

// setting up a connection and working with test data
port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port 3000: http://localhost:${port}/`);
});
