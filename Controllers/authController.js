const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.loginLocal = passport.authenticate('local', {
  failureRedirect: '/',
  successRedirect: '/'
});

exports.loginGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] });

exports.loginGoogleCb = passport.authenticate('google', { failureRedirect: '/' });
