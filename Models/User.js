const mongoose = require('mongoose');

const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: 'Please Supply an email address',
	},
	username: {
		type: String,
		required: 'Please Supply a Username',
		trim: true,
	},
	photo: {
		type: String,
	},
	auth: {
		type: { type: String },
		id: { type: String },
		token: { type: String },
	},
	resetPasswordToken: String,
	resetPasswordExpires: Date,
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

userSchema.statics.findAndModify = function fAndM(query, callback) {
	return this.collection.findAndModify(query, callback);
};

userSchema.statics.setPass = pass => new Promise((resolve, reject) => {
	userSchema.setPassword(pass, (err) => {
		if (!err) {
			console.log(err);
			reject(err);
		}
		resolve(pass);
	});
});

module.exports = mongoose.model('User', userSchema);
