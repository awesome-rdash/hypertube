const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FortyTwoStrategy = require('passport-42').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(User.createStrategy());
passport.use(new GoogleStrategy({
		clientID: process.env.G_ID,
		clientSecret: process.env.G_SECRET,
		callbackURL: '/login/google/cb',
		passReqToCallback: false
	},
	async function(token, refreshToken, profile, done) {
		let user = await User.findOne({ email: profile.emails[0] });
		if (!user) {
			let user = new User({
				username: `${profile.name.givenName} ${profile.name.familyName[0]}`,
				email: profile.emails[0].value,
				google: {
					id: profile.id,
					token
				}
			});
			user.save();
		}
		return done(null, user);
	}
));

passport.use(new FortyTwoStrategy({
		clientID: process.env.SCHOOL_ID,
		clientSecret: process.env.SCHOOL_SECRET,
		callbackURL: '/login/42/cb'
	},
	async function(token, refreshToken, profile, done) {
		let user = await User.findOne({ email: profile.emails[0] });
		console.log(profile);
		if (!user) {
			let user = new User({
				username: `${profile.name.givenName} ${profile.name.familyName[0]}`,
				email: profile.emails[0].value,
				google: {
					id: profile.id,
					token
				}
			});
			user.save();
		}
		return done(null, user);
	}
));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
