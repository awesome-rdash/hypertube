const mongoose = require('mongoose');
const multer = require('multer');
const uuid = require('uuid');
const jimp = require('jimp');

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
	if (req.file) {
		const extension = req.file.mimetype.split('/')[1];
		req.body.photo = `${uuid.v4()}.${extension}`;
		const photo = await jimp.read(req.file.buffer);
		await photo.write(`./Public/uploads/${req.body.photo}`);
	}

	// Input Validation
	req.checkBody('username', 'errLastName').notEmpty();
	req.sanitizeBody('username');
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

exports.updateUser = async (req, res) => {
	const user = await User.findOneAndUpdate(
		{ email: req.user.email },
		req.body,
		{ new: true, runValidators: true });
	return res.json(user);
};
