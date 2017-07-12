const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.loginLocal = passport.authenticate('local', {
  failureRedirect: '/yo', successRedirect: '/'
});

exports.loginGoogle = passport.authenticate('google', {
	scope: ['https://www.googleapis.com/auth/plus.profile.emails.read']
});

exports.loginGoogleCb = passport.authenticate('google', {
	failureRedirect: '/yo', successRedirect: '/'
});

exports.login42 = passport.authenticate('42');

exports.login42Cb = passport.authenticate('42', {
	failureRedirect: '/yo', successRedirect: '/'
});

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};
