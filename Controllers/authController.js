const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('User');


exports.loginLocal = passport.authenticate('local', {
  failureRedirect: '/', successRedirect: '/'
});

exports.loginGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] });
exports.loginGoogleCb = passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' });

exports.login42 = passport.authenticate('42');
exports.login42Cb = passport.authenticate('42', { failureRedirect: '/', successRedirect: '/' });
// exports.login42Cb = (req, res, next) => {
// 	passport.authenticate('42', { failureRedirect: '/error', successRedirect: '/' });
// 	next();
// };

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};
