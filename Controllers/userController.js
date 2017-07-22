const mongoose = require('mongoose');

const multer = require('multer');

const uuid = require('uuid');

const jimp = require('jimp');

const fs = require('fs');

const User = mongoose.model('User');

exports.validateRegister = async (req, res, next) => {
	req.checkBody('lastName', 'errLastName').notEmpty();
	req.checkBody('firstName', 'errFirstName').notEmpty();
	req.sanitizeBody('lastName');
	req.sanitizeBody('firstName');
	req.checkBody('email', 'errMail').isEmail();
	req.checkBody('password', 'errPassword').notEmpty();
	req.checkBody('password', 'errStrength').matches(/((?=.*\d)(?=.*[a-z]).{6, 20})/);
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

const multerOptions = {
	storage: multer.memoryStorage(),
	fileFilter(req, file, next) {
		if (file.mimetype.startsWith('image/jpg')
		|| file.mimetype.startsWith('image/png')) {
			next(null, true);
		} else {
			next({ message: 'errFileType' }, false);
		}
	},
};
exports.uploadImage = multer(multerOptions).single('photo');

exports.validateUpdate = async (req, res, next) => {
	// Picture Management
	console.log(req.body.photo);
	if (req.body.photo) {
		const regex = /^data:.+\/(.+);base64,(.*)$/;
		const picture = req.body.photo.match(regex);
		if (picture) {
			const name = `${req.user.email}.${picture[1]}`;
			if (picture[1] === 'jpg' || picture[1] === 'png' || picture[1] === 'jpeg') {
				fs.writeFile(`Public/uploads/${name}`, picture[2]);
				req.body.photo = `/uploads/${name}`;
			} else {
				return res.send({ errors: [{ msg: 'errPhoto' }] });
			}
		} else {
			return res.send({ errors: [{ msg: 'errPhoto' }] });
		}
	}

	// Input Validation
	req.checkBody('username', 'errUsername').notEmpty();
	req.sanitizeBody('username');
	req.checkBody('email', 'errMail').isEmail();
	// req.checkBody('password', 'errPassword').notEmpty();
	// req.checkBody('password', 'errStrength').matches(/((?=.*\d)(?=.*[a-z]).{6, 20})/);
	// req.checkBody('password-confirm', 'errBlankConfirm').notEmpty();
	// req.checkBody('password-confirm', 'errNoMatch').equals(req.body.password);

	const results = await req.getValidationResult();
	if (!results.isEmpty()) {
		return res.json({ errors: results.array() });
	}
	return next();
};

exports.updateUser = async (req, res) => {
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		req.body,
		{ new: true, runValidators: true });
	return res.json(user);
};
