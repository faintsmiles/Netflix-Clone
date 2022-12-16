// import 'dotenv/config
require('dotenv').config();
const express = require('express')
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const createError = require('http-errors');
const logger = require('morgan');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false }));

require('./config/passport')
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client/build/')));


const indexRouter = require('./routes/index')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const logoutRouter = require('./routes/logout')
const apiRouter = require('./routes/api.js');

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);
app.use('/login', loginRouter);
app.use('/api', apiRouter);
app.use('*', (req, res, next) => res.redirect('/'));

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
  res.json({error: 'error'});
});

app.listen( PORT, () => console.log(`Server listening on ${PORT}`));
