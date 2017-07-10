const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());
passport.use(new GoogleStrategy({
		clientID: process.env.G_ID,
		clientSecret: process.env.G_SECRET,
		callbackURL: '/login/google/cb'
	},
	function(token, refreshToken, profile, done) {
		User.findOfCreate({ googleId: profile.id }, function (err, user) {
			return done(err, user);
		});
	}
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
