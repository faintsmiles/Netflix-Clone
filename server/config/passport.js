const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User')
const bcrypt = require('bcryptjs');

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true
    },
    function (req, email, password, done) {

      // Find user in database
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        // User was not found in database
        if (!user) {
          return done(null, false);
        }

        // Encrypt given password and match to the stored encrypted password
        bcrypt.compare(password, user.password, (err, success) => {
      
          if (success) {
            console.log("Passwords match")
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser( (id, done) => {
    User.findById(id, (err,user) => {
        done(err, user);
    });
  });