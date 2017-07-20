const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.validateRegister = async (req, res, next) => {
	req.checkBody('lastName', 'errLastName').notEmpty();
	req.checkBody('firstName', 'errFirstName').notEmpty();
	req.sanitizeBody('lastName');
	req.sanitizeBody('firstName');
	req.checkBody('email', 'errMail').isEmail();
	req.checkBody('password', 'errPassword').notEmpty();
// req.checkBody('password', 'Password Cannot be Blank!').matches(((?=.*\d)(?=.*[a-z]).{6, 20}));
	req.checkBody('password-confirm', 'errBlankConfirm').notEmpty();
	req.checkBody('password-confirm', 'errNoMatch').equals(req.body.password);

	const results = await req.getValidationResult();
	if (!results.isEmpty()) {
		return res.json({ errors: results.array() });
	}
	return next();
};

exports.registerUser = (req, res, next) => {
	User.register(new User({
		email: req.body.email,
		username: `${req.body.firstName} ${req.body.lastName[0]}`,
		'auth.type': 'local',
	}), req.body.password, (err) => {
		if (err) {
			return res.send(err);
		}
		return next();
	});
};

exports.validateUpdate = async (req, res, next) => {
	req.checkBody('username', 'errLastName').notEmpty();
	req.sanitizeBody('username');
	req.checkBody('email', 'errMail').isEmail();
	req.checkBody('password', 'errPassword').notEmpty();
// req.checkBody('password', 'Password Cannot be Blank!').matches(((?=.*\d)(?=.*[a-z]).{6, 20}));
	req.checkBody('password-confirm', 'errBlankConfirm').notEmpty();
	req.checkBody('password-confirm', 'errNoMatch').equals(req.body.password);

	const results = await req.getValidationResult();
	if (!results.isEmpty()) {
		return res.json({ errors: results.array() });
	}
	return next();
};

exports.updateUser = async (req, res) => {
	console.log(req.user);
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		req.body,
		{ new: true, runValidators: true });
	return res.json(user);
};
