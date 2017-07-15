const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.loginNoRedirect = (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		console.log(info);
		req.logIn(user, (error) => {
			if (error) { console.log(error); }
		});
	})(req, res, next);
	return res.send('ok');
};

exports.loginGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.profile.emails.read'] });
exports.loginGoogleCb = passport.authenticate('google', { failureRedirect: '/', successRedirect: '/' });

exports.login42 = passport.authenticate('42');
exports.login42Cb = passport.authenticate('42', { failureRedirect: '/', successRedirect: '/' });

exports.hasAccount = async (req, res) => {
	const user = await User.findOne(req.query);
	res.send((user && user.auth.type) || false);
};

exports.logout = (req, res) => {
	req.logout();
	res.redirect('/');
};
