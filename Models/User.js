const mongoose = require('mongoose');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		required: 'Please Supply an email address'
	},
	username: {
		type: String,
		required: 'Please Supply a Username',
		trim: true
	},
	extAuth: {
		type: { type: String },
		id: { type: String },
		token: { type: String }
	}
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

userSchema.statics.findAndModify = function (query, callback) {
	return this.collection.findAndModify(query, callback);
};

module.exports = mongoose.model('User', userSchema);
